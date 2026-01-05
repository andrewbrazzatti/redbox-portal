// Copyright (c) 2017 Queensland Cyber Infrastructure Foundation (http://www.qcif.edu.au/)
//
// GNU GENERAL PUBLIC LICENSE
//    Version 2, June 1991

const { describe, it, beforeEach, before } = require('mocha');
const { Effect, Exit, Option } = require('effect');

// Service modules path from test directory
const servicePath = '../../../figshare';

describe('Figshare Module - Errors', () => {
  let expect;
  let errors;

  before(async () => {
    const chai = await import('chai');
    expect = chai.expect;
    errors = require(`${servicePath}/errors`);
  });

  describe('FigshareNetworkError', () => {
    it('should create from axios error with status', () => {
      const axiosError = {
        response: {
          status: 500,
          statusText: 'Internal Server Error',
          data: { message: 'Something went wrong' }
        },
        message: 'Request failed'
      };

      const error = errors.FigshareNetworkError.fromAxiosError(axiosError, true);

      expect(error._tag).to.equal('FigshareNetworkError');
      expect(error.status).to.equal(500);
      expect(error.statusText).to.equal('Internal Server Error');
      expect(error.retryable).to.be.true;
      expect(error.message).to.include('500');
    });

    it('should create from axios error without response', () => {
      const axiosError = {
        message: 'Network Error'
      };

      const error = errors.FigshareNetworkError.fromAxiosError(axiosError, false);

      expect(error.status).to.be.undefined;
      expect(error.retryable).to.be.false;
      expect(error.message).to.equal('Network Error');
    });
  });

  describe('FigshareValidationError', () => {
    it('should create required field error', () => {
      const error = errors.FigshareValidationError.requiredField('title', 'oid123');

      expect(error._tag).to.equal('FigshareValidationError');
      expect(error.field).to.equal('title');
      expect(error.constraint).to.equal('required');
      expect(error.oid).to.equal('oid123');
    });

    it('should create invalid field error', () => {
      const error = errors.FigshareValidationError.invalidField(
        'embargo_date',
        'must be a valid date',
        'oid456'
      );

      expect(error.field).to.equal('embargo_date');
      expect(error.constraint).to.equal('must be a valid date');
    });
  });

  describe('FigshareArticleStateError', () => {
    it('should create upload in progress error', () => {
      const error = errors.FigshareArticleStateError.uploadInProgress('12345', 'oid789');

      expect(error._tag).to.equal('FigshareArticleStateError');
      expect(error.articleId).to.equal('12345');
      expect(error.currentState).to.equal('upload_in_progress');
      expect(error.expectedState).to.equal('ready');
    });

    it('should create already published error', () => {
      const error = errors.FigshareArticleStateError.alreadyPublished('67890');

      expect(error.currentState).to.equal('public');
      expect(error.expectedState).to.equal('draft');
    });
  });

  describe('FigshareUploadError', () => {
    it('should create part upload failed error', () => {
      const error = errors.FigshareUploadError.partUploadFailed('test.pdf', 3, 10);

      expect(error._tag).to.equal('FigshareUploadError');
      expect(error.fileName).to.equal('test.pdf');
      expect(error.partNo).to.equal(3);
      expect(error.totalParts).to.equal(10);
    });

    it('should create download failed error', () => {
      const error = errors.FigshareUploadError.downloadFailed('data.csv', 'oid123');

      expect(error.fileName).to.equal('data.csv');
      expect(error.oid).to.equal('oid123');
    });
  });

  describe('FigshareConfigError', () => {
    it('should create missing key error', () => {
      const error = errors.FigshareConfigError.missingKey('apiToken');

      expect(error._tag).to.equal('FigshareConfigError');
      expect(error.configKey).to.equal('apiToken');
    });

    it('should create api disabled error', () => {
      const error = errors.FigshareConfigError.apiDisabled();

      expect(error.message).to.include('disabled');
    });
  });

  describe('Type guards', () => {
    it('should identify FigshareError', () => {
      const networkError = new errors.FigshareNetworkError({
        message: 'test',
        retryable: true
      });
      const validationError = errors.FigshareValidationError.requiredField('test');

      expect(errors.isFigshareError(networkError)).to.be.true;
      expect(errors.isFigshareError(validationError)).to.be.true;
      expect(errors.isFigshareError(new Error('plain error'))).to.be.false;
      expect(errors.isFigshareError(null)).to.be.false;
    });

    it('should check retryable errors', () => {
      const retryableError = new errors.FigshareNetworkError({
        message: 'test',
        retryable: true
      });
      const nonRetryableError = new errors.FigshareNetworkError({
        message: 'test',
        retryable: false
      });
      const validationError = errors.FigshareValidationError.requiredField('test');

      expect(errors.isRetryable(retryableError)).to.be.true;
      expect(errors.isRetryable(nonRetryableError)).to.be.false;
      expect(errors.isRetryable(validationError)).to.be.false;
    });
  });

  describe('isRetryableStatus', () => {
    it('should return true for retry status codes', () => {
      expect(errors.isRetryableStatus(500)).to.be.true;
      expect(errors.isRetryableStatus(502)).to.be.true;
      expect(errors.isRetryableStatus(503)).to.be.true;
      expect(errors.isRetryableStatus(504)).to.be.true;
      expect(errors.isRetryableStatus(429)).to.be.true;
    });

    it('should return false for non-retry status codes', () => {
      expect(errors.isRetryableStatus(200)).to.be.false;
      expect(errors.isRetryableStatus(400)).to.be.false;
      expect(errors.isRetryableStatus(401)).to.be.false;
      expect(errors.isRetryableStatus(404)).to.be.false;
    });

    it('should return true for undefined (no response)', () => {
      expect(errors.isRetryableStatus(undefined)).to.be.true;
    });
  });
});

describe('Figshare Module - Config', () => {
  let expect;
  let config;

  before(async () => {
    const chai = await import('chai');
    expect = chai.expect;
    config = require(`${servicePath}/config`);
  });

  describe('parseRetryConfig', () => {
    it('should parse valid config', () => {
      const rawConfig = {
        maxAttempts: 5,
        baseDelayMs: 1000,
        maxDelayMs: 10000,
        retryOnStatusCodes: [500, 502],
        retryOnMethods: ['GET', 'PUT']
      };

      const result = config.parseRetryConfig(rawConfig);

      expect(result.maxAttempts).to.equal(5);
      expect(result.baseDelayMs).to.equal(1000);
      expect(result.maxDelayMs).to.equal(10000);
      expect(result.retryOnStatusCodes).to.deep.equal([500, 502]);
      expect(result.retryOnMethods).to.deep.equal(['get', 'put']);
    });

    it('should use defaults for invalid config', () => {
      const result = config.parseRetryConfig({});

      expect(result.maxAttempts).to.equal(config.defaultRetryConfig.maxAttempts);
      expect(result.baseDelayMs).to.equal(config.defaultRetryConfig.baseDelayMs);
    });

    it('should handle negative values', () => {
      const result = config.parseRetryConfig({
        maxAttempts: -1,
        baseDelayMs: -100
      });

      expect(result.maxAttempts).to.equal(1);
      expect(result.baseDelayMs).to.equal(0);
    });
  });

  describe('parseRuntimeConfig', () => {
    it('should parse sails config', () => {
      const sailsConfig = {
        figshareAPI: {
          APIToken: 'test-token',
          baseURL: 'https://api.figshare.com',
          frontEndURL: 'https://figshare.com',
          mapping: {
            recordFigArticleId: 'metadata.figshare_id'
          }
        },
        figshareAPIEnv: {
          overrideArtifacts: {}
        },
        record: {
          createUpdateFigshareArticleLogLevel: 'info'
        }
      };

      const result = config.parseRuntimeConfig(sailsConfig);

      expect(result.apiToken).to.equal('test-token');
      expect(result.baseURL).to.equal('https://api.figshare.com');
      expect(result.frontEndURL).to.equal('https://figshare.com');
      expect(result.logLevel).to.equal('info');
    });

    it('should use override artifacts', () => {
      const sailsConfig = {
        figshareAPI: {
          APIToken: 'base-token',
          baseURL: 'https://api.figshare.com'
        },
        figshareAPIEnv: {
          overrideArtifacts: {
            APIToken: 'override-token',
            baseURL: 'https://override.figshare.com'
          }
        }
      };

      const result = config.parseRuntimeConfig(sailsConfig);

      expect(result.apiToken).to.equal('override-token');
      expect(result.baseURL).to.equal('https://override.figshare.com');
    });
  });

  describe('isApiEnabled', () => {
    it('should return true when all required fields present', () => {
      const runtimeConfig = {
        apiToken: 'token',
        baseURL: 'https://api.figshare.com',
        frontEndURL: 'https://figshare.com'
      };

      expect(config.isApiEnabled(runtimeConfig)).to.be.true;
    });

    it('should return false when apiToken missing', () => {
      const runtimeConfig = {
        apiToken: '',
        baseURL: 'https://api.figshare.com',
        frontEndURL: 'https://figshare.com'
      };

      expect(config.isApiEnabled(runtimeConfig)).to.be.false;
    });

    it('should return false when baseURL missing', () => {
      const runtimeConfig = {
        apiToken: 'token',
        baseURL: '',
        frontEndURL: 'https://figshare.com'
      };

      expect(config.isApiEnabled(runtimeConfig)).to.be.false;
    });
  });
});

describe('Figshare Module - Validation', () => {
  let expect;
  let validation;

  before(async () => {
    const chai = await import('chai');
    expect = chai.expect;
    validation = require(`${servicePath}/validation`);
  });

  describe('isEmpty', () => {
    it('should return true for null/undefined', () => {
      expect(validation.isEmpty(null)).to.be.true;
      expect(validation.isEmpty(undefined)).to.be.true;
    });

    it('should return true for empty string', () => {
      expect(validation.isEmpty('')).to.be.true;
      expect(validation.isEmpty('   ')).to.be.true;
    });

    it('should return true for empty array', () => {
      expect(validation.isEmpty([])).to.be.true;
    });

    it('should return false for non-empty values', () => {
      expect(validation.isEmpty('test')).to.be.false;
      expect(validation.isEmpty([1, 2, 3])).to.be.false;
      expect(validation.isEmpty(0)).to.be.false;
      expect(validation.isEmpty(false)).to.be.false;
    });
  });

  describe('validateField', () => {
    it('should pass for valid required field', async () => {
      const result = await Effect.runPromiseExit(
        validation.validateField(
          { title: 'Test Title' },
          { figName: 'title', required: true }
        )
      );

      expect(Exit.isSuccess(result)).to.be.true;
    });

    it('should fail for missing required field', async () => {
      const result = await Effect.runPromiseExit(
        validation.validateField(
          { title: '' },
          { figName: 'title', required: true }
        )
      );

      expect(Exit.isFailure(result)).to.be.true;
    });

    it('should pass for missing optional field', async () => {
      const result = await Effect.runPromiseExit(
        validation.validateField(
          { title: '' },
          { figName: 'title', required: false }
        )
      );

      expect(Exit.isSuccess(result)).to.be.true;
    });

    it('should validate minLength', async () => {
      const failResult = await Effect.runPromiseExit(
        validation.validateField(
          { title: 'ab' },
          { figName: 'title', required: true, minLength: 3 }
        )
      );

      expect(Exit.isFailure(failResult)).to.be.true;

      const passResult = await Effect.runPromiseExit(
        validation.validateField(
          { title: 'abc' },
          { figName: 'title', required: true, minLength: 3 }
        )
      );

      expect(Exit.isSuccess(passResult)).to.be.true;
    });
  });

  describe('validateCreateRequestBody', () => {
    it('should validate required title', async () => {
      const failResult = await Effect.runPromiseExit(
        validation.validateCreateRequestBody({ description: 'test' })
      );

      expect(Exit.isFailure(failResult)).to.be.true;

      const passResult = await Effect.runPromiseExit(
        validation.validateCreateRequestBody({ title: 'Test Title' })
      );

      expect(Exit.isSuccess(passResult)).to.be.true;
    });
  });
});

describe('Figshare Module - Operations/Authors', () => {
  let expect;
  let authors;

  before(async () => {
    const chai = await import('chai');
    expect = chai.expect;
    authors = require(`${servicePath}/operations/authors`);
  });

  describe('getUniqueContributors', () => {
    it('should return unique contributors by field', () => {
      const contributors = [
        { email: 'a@test.com', name: 'Alice' },
        { email: 'b@test.com', name: 'Bob' },
        { email: 'a@test.com', name: 'Alice Duplicate' }
      ];

      const unique = authors.getUniqueContributors(contributors, 'email');

      expect(unique).to.have.length(2);
      expect(unique[0].name).to.equal('Alice');
      expect(unique[1].name).to.equal('Bob');
    });

    it('should return all if no uniqueBy specified', () => {
      const contributors = [
        { email: 'a@test.com' },
        { email: 'a@test.com' }
      ];

      const unique = authors.getUniqueContributors(contributors);

      expect(unique).to.have.length(2);
    });
  });

  describe('transformEmail', () => {
    it('should apply prefix to email domain', () => {
      const result = authors.transformEmail('user@domain.com', { prefix: 'test.', template: '' });
      expect(result).to.equal('user@test.domain.com');
    });

    it('should override email domain', () => {
      const result = authors.transformEmail('user@old.com', { override: 'new.com', template: '' });
      expect(result).to.equal('user@new.com');
    });

    it('should return unchanged for non-email', () => {
      const result = authors.transformEmail('notanemail', { prefix: 'test.', template: '' });
      expect(result).to.equal('notanemail');
    });
  });

  describe('hasAuthorId', () => {
    it('should return true for author with id', () => {
      expect(authors.hasAuthorId({ id: 123 })).to.be.true;
    });

    it('should return false for author with name only', () => {
      expect(authors.hasAuthorId({ name: 'Test Author' })).to.be.false;
    });
  });

  describe('getImpersonateAuthorId', () => {
    it('should return first author ID', () => {
      const authorList = [
        { id: 123 },
        { name: 'External Author' },
        { id: 456 }
      ];

      const result = authors.getImpersonateAuthorId(authorList);
      expect(Option.isSome(result)).to.be.true;
      expect(result.value).to.equal(123);
    });

    it('should return none for name-only authors', () => {
      const authorList = [
        { name: 'External 1' },
        { name: 'External 2' }
      ];

      const result = authors.getImpersonateAuthorId(authorList);
      expect(Option.isNone(result)).to.be.true;
    });

    it('should return none for empty list', () => {
      const result = authors.getImpersonateAuthorId([]);
      expect(Option.isNone(result)).to.be.true;
    });
  });
});

describe('Figshare Module - Operations/Categories', () => {
  let expect;
  let categories;

  before(async () => {
    const chai = await import('chai');
    expect = chai.expect;
    categories = require(`${servicePath}/operations/categories`);
  });

  describe('mapFORCodeToCategory', () => {
    it('should map FOR code to category ID', () => {
      const mapping = [
        { forCode: '0801', figshareCategory: 37120 },
        { forCode: '0101', figshareCategory: 37104 }
      ];

      expect(categories.mapFORCodeToCategory('0801', mapping)).to.equal(37120);
      expect(categories.mapFORCodeToCategory('0101', mapping)).to.equal(37104);
    });

    it('should return undefined for unknown code', () => {
      const mapping = [
        { forCode: '0801', figshareCategory: 37120 }
      ];

      expect(categories.mapFORCodeToCategory('9999', mapping)).to.be.undefined;
    });
  });

  describe('mapFORCodesToCategories', () => {
    it('should map multiple codes and dedupe', () => {
      const mapping = [
        { forCode: '0801', figshareCategory: 37120 },
        { forCode: '0802', figshareCategory: 37120 },
        { forCode: '0101', figshareCategory: 37104 }
      ];

      const result = categories.mapFORCodesToCategories(['0801', '0802', '0101'], mapping);

      expect(result).to.have.length(2);
      expect(result).to.include(37120);
      expect(result).to.include(37104);
    });
  });
});

describe('Figshare Module - Operations/Article', () => {
  let expect;
  let article;

  before(async () => {
    const chai = await import('chai');
    expect = chai.expect;
    article = require(`${servicePath}/operations/article`);
  });

  describe('getArticleIdFromRecord', () => {
    it('should extract article ID from record', () => {
      const record = {
        metadata: {
          figshare_article_id: '12345'
        }
      };

      const result = article.getArticleIdFromRecord(record, 'metadata.figshare_article_id');
      expect(Option.isSome(result)).to.be.true;
      expect(result.value).to.equal(12345);
    });

    it('should return none for missing path', () => {
      const record = { metadata: {} };

      const result = article.getArticleIdFromRecord(record, 'metadata.figshare_article_id');
      expect(Option.isNone(result)).to.be.true;
    });

    it('should return none for invalid ID', () => {
      const record = {
        metadata: { figshare_article_id: 'not-a-number' }
      };

      const result = article.getArticleIdFromRecord(record, 'metadata.figshare_article_id');
      expect(Option.isNone(result)).to.be.true;
    });
  });

  describe('setArticleIdInRecord', () => {
    it('should set article ID in record', () => {
      const record: any = { metadata: {} };

      const result = article.setArticleIdInRecord(
        record,
        'metadata.figshare_article_id',
        12345
      );

      expect(result.metadata.figshare_article_id).to.equal('12345');
      expect(record.metadata.figshare_article_id).to.be.undefined; // Original unchanged
    });
  });

  describe('setArticleURLInRecord', () => {
    it('should set article URL in multiple paths', () => {
      const record = { metadata: {} };

      const result = article.setArticleURLInRecord(
        record,
        ['metadata.url1', 'metadata.url2'],
        'https://figshare.com/articles',
        12345
      );

      expect(result.metadata.url1).to.equal('https://figshare.com/articles/12345');
      expect(result.metadata.url2).to.equal('https://figshare.com/articles/12345');
    });
  });
});

describe('Figshare Module - Operations/Files', () => {
  let expect;
  let files;

  before(async () => {
    const chai = await import('chai');
    expect = chai.expect;
    files = require(`${servicePath}/operations/files`);
  });

  describe('hasPendingUploads', () => {
    it('should return true when files have created status', () => {
      const fileList = [
        { id: 1, status: 'available' },
        { id: 2, status: 'created' }
      ];

      expect(files.hasPendingUploads(fileList)).to.be.true;
    });

    it('should return false when no files are pending', () => {
      const fileList = [
        { id: 1, status: 'available' },
        { id: 2, status: 'available' }
      ];

      expect(files.hasPendingUploads(fileList)).to.be.false;
    });
  });

  describe('getCompletedFiles', () => {
    it('should filter completed files', () => {
      const fileList = [
        { id: 1, status: 'available' },
        { id: 2, status: 'created' },
        { id: 3, status: 'available' }
      ];

      const completed = files.getCompletedFiles(fileList);

      expect(completed).to.have.length(2);
      expect(completed.map(f => f.id)).to.deep.equal([1, 3]);
    });
  });

  describe('getPendingFiles', () => {
    it('should filter pending files', () => {
      const fileList = [
        { id: 1, status: 'available' },
        { id: 2, status: 'created' },
        { id: 3, status: 'created' }
      ];

      const pending = files.getPendingFiles(fileList);

      expect(pending).to.have.length(2);
      expect(pending.map(f => f.id)).to.deep.equal([2, 3]);
    });
  });
});

describe('Figshare Module - Runtime', () => {
  let expect;
  let runtime;
  let errors;

  before(async () => {
    const chai = await import('chai');
    expect = chai.expect;
    runtime = require(`${servicePath}/runtime`);
    errors = require(`${servicePath}/errors`);
  });

  describe('toRBValidationError', () => {
    it('should convert FigshareNetworkError', () => {
      const figError = new errors.FigshareNetworkError({
        message: 'Connection failed',
        status: 500,
        retryable: false
      });

      const rbError = runtime.toRBValidationError(figError);

      expect(rbError.message).to.equal('Connection failed');
      expect(rbError.displayErrors[0].title).to.include('Figshare');
    });

    it('should convert FigshareValidationError', () => {
      const figError = errors.FigshareValidationError.requiredField('title', 'oid123');

      const rbError = runtime.toRBValidationError(figError);

      expect(rbError.displayErrors[0].meta.field).to.equal('title');
    });

    it('should convert FigshareArticleStateError with correct code', () => {
      const figError = errors.FigshareArticleStateError.uploadInProgress('12345');

      const rbError = runtime.toRBValidationError(figError);

      expect(rbError.displayErrors[0].code).to.equal(
        '@backend-Upload-In-Progress-validationMessage'
      );
    });

    it('should convert FigshareUploadError', () => {
      const figError = errors.FigshareUploadError.partUploadFailed('test.pdf', 3, 10);

      const rbError = runtime.toRBValidationError(figError);

      expect(rbError.displayErrors[0].title).to.include('upload');
      expect(rbError.displayErrors[0].meta.fileName).to.equal('test.pdf');
    });

    it('should convert FigshareConfigError', () => {
      const figError = errors.FigshareConfigError.missingKey('apiToken');

      const rbError = runtime.toRBValidationError(figError);

      expect(rbError.displayErrors[0].title).to.include('configuration');
    });
  });

  describe('Logger factories', () => {
    it('should create silent logger', () => {
      const logger = runtime.makeSilentLogger();

      // These should not throw
      logger.verbose('test');
      logger.info('test');
      logger.warn('test');
      logger.error('test');
    });

    it('should create console logger', () => {
      const logger = runtime.makeConsoleLogger();

      expect(logger.verbose).to.equal(console.log);
      expect(logger.info).to.equal(console.info);
      expect(logger.warn).to.equal(console.warn);
      expect(logger.error).to.equal(console.error);
    });
  });
});
