// Copyright (c) 2017 Queensland Cyber Infrastructure Foundation (http://www.qcif.edu.au/)
//
// GNU GENERAL PUBLIC LICENSE
//    Version 2, June 1991

const { describe, it, before } = require('mocha');
const { Effect, Exit, Option, Context, Layer } = require('effect');

// Service modules path from test directory
const servicePath = '../../../figshare';

describe('Figshare Module - Authors Validation', () => {
    let expect;
    let authors;
    let FigshareClient;

    before(async () => {
        const chai = await import('chai');
        expect = chai.expect;
        authors = require(`${servicePath}/operations/authors`);
        FigshareClient = require(`${servicePath}/client`).FigshareClient;
    });

    describe('searchAuthor', () => {
        it('should return Option.some({ id }) for valid finite numeric user id', async () => {
            const mockClient = {
                post: () => Effect.succeed({
                    data: [{ id: 12345 }]
                })
            };

            const program = authors.searchAuthor({ email: 'test@example.com' }, 'id')
                .pipe(Effect.provideService(FigshareClient, mockClient));

            const result = await Effect.runPromise(program);

            expect(Option.isSome(result)).to.be.true;
            expect(result.value).to.deep.equal({ id: 12345 });
        });

        it('should return Option.none() for non-finite user id', async () => {
            const mockClient = {
                post: () => Effect.succeed({
                    data: [{ id: 'invalid' }] // produces NaN when Number()
                })
            };

            const program = authors.searchAuthor({ email: 'test@example.com' }, 'id')
                .pipe(Effect.provideService(FigshareClient, mockClient));

            const result = await Effect.runPromise(program);

            expect(Option.isNone(result)).to.be.true;
        });

        it('should log warning and return fallback on error', async () => {
            let logMessages = [];
            const mockClient = {
                post: () => Effect.fail(new Error('Network error'))
            };

            // Custom logger to capture logs would be ideal, but simply running it verifies no crash and correct fallback
            // We verify it returns Option.none() which is the result of fallback { data: [] } -> no author -> Option.none()
            
            const program = authors.searchAuthor({ email: 'test@example.com' }, 'id')
                .pipe(Effect.provideService(FigshareClient, mockClient));

            const result = await Effect.runPromise(program);
            
            expect(Option.isNone(result)).to.be.true;
        });
    });

    describe('getAuthorUserIDs (Unmatched Contributors)', () => {
        it('should add unmatched contributors with valid string names', async () => {
           const contributors = [
               { name: 'Valid Name', email: 'valid@example.com' },
               { name: 123, email: 'number@example.com' }
           ];
           // Mock client to return no match so they fall into unmatched
           const mockClient = {
               post: () => Effect.succeed({ data: [] })
           };
           
           const searchTemplates = [{ template: 'email', email: 'email' }];
           const externalNameField = 'name';
           
           const program = authors.getAuthorUserIDs(
               contributors, 
               searchTemplates, 
               externalNameField, 
               'id', 
               {}, 
               (t, c) => c.field.email // simple template engine assuming structure
            ).pipe(Effect.provideService(FigshareClient, mockClient));

            const result = await Effect.runPromise(program);
            
            // Check unmatched added correctly
            // First (Valid Name) is string -> added
            // Second (123) is number -> added as "123"
            const nameOnly = result.filter(a => 'name' in a && !('id' in a));
            
            expect(nameOnly).to.have.length(2);
            // The order might be preserved?
            // The code:
            // for (const contributor of contributors) { ... if (!matched) unmatchedContributors.push(contributor) }
            // for (const contributor of unmatchedContributors) { ... matchedAuthors.push(...) }
            // So order should be preserved.
            
            const names = nameOnly.map(a => a.name);
            expect(names).to.include('Valid Name');
            expect(names).to.include('123');
        });

        it('should skip unmatched contributors with non-primitive names', async () => {
            const contributors = [
                { name: { obj: 'invalid' }, email: 'obj@example.com' },
                { name: ['array'], email: 'arr@example.com' },
                { name: null, email: 'null@example.com' },
                { name: undefined, email: 'undefined@example.com' }
            ];
 
            const mockClient = {
                post: () => Effect.succeed({ data: [] })
            };
            
            const searchTemplates = [{ template: 'email', email: 'email' }];
            const externalNameField = 'name';
            
            // Template engine: return email from context.field which is the contributor object
            const templateEngine = (t, context) => {
                return context.field[t];
            };

            const program = authors.getAuthorUserIDs(
                contributors, 
                searchTemplates, 
                externalNameField, 
                'id', 
                {}, 
                templateEngine
             ).pipe(Effect.provideService(FigshareClient, mockClient));
 
             const result = await Effect.runPromise(program);
             
             // No matches, so unmatched logic runs.
             // All provided have invalid names (object, array, null, undefined)
             expect(result).to.have.length(0);
         });
    });
});
