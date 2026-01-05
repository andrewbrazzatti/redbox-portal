
const { describe, it, beforeEach } = require('mocha');
const { expect } = require('chai');
const { Effect } = require('effect');
const { RecordsService, makeRecordsServiceTest } = require('../../../figshare/services/records');

describe('Figshare Records Service', () => {
  let serviceLayer;

  beforeEach(() => {
    serviceLayer = makeRecordsServiceTest({
      'oid-1': { redboxOid: 'oid-1', title: 'Test Record', nested: { val: 1 }, items: [{ id: 1 }] }
    });
  });

  const getService = () => Effect.runPromise(Effect.provide(Effect.gen(function* () {
    return yield* RecordsService;
  }), serviceLayer));

  describe('getPath', () => {
    it('should retrieve a top-level property', async () => {
      const service = await getService();
      const val = service.getPath({ redboxOid: '1', title: 'foo' }, 'title');
      expect(val).to.equal('foo');
    });

    it('should retrieve a nested property', async () => {
      const service = await getService();
      const val = service.getPath({ redboxOid: '1', nested: { foo: 'bar' } }, 'nested.foo');
      expect(val).to.equal('bar');
    });

    it('should retrieve an array item using index notation', async () => {
      const service = await getService();
      const val = service.getPath({ redboxOid: '1', items: [{ name: 'item1' }] }, 'items[0].name');
      expect(val).to.equal('item1');
    });

    it('should return undefined for non-existent path', async () => {
      const service = await getService();
      const val = service.getPath({ redboxOid: '1' }, 'non.existent');
      expect(val).to.be.undefined;
    });
  });

  describe('setPath', () => {
    it('should set a top-level property', async () => {
      const service = await getService();
      const record = { redboxOid: '1' };
      const newRecord = service.setPath(record, 'title', 'New Title');
      expect(newRecord.title).to.equal('New Title');
      expect(record).to.not.have.property('title'); // Immutability check
    });

    it('should set a nested property', async () => {
      const service = await getService();
      const record = { redboxOid: '1', nested: { val: 1 } };
      const newRecord = service.setPath(record, 'nested.val', 2);
      expect(newRecord.nested.val).to.equal(2);
      expect(record.nested.val).to.equal(1); // Immutability check
    });

    it('should handle array index notation for existing arrays', async () => {
      const service = await getService();
      const record = { redboxOid: '1', items: [{ val: 1 }] };
      const newRecord = service.setPath(record, 'items[0].val', 2);
      expect(newRecord.items[0].val).to.equal(2);
      expect(record.items[0].val).to.equal(1);
    });

    it('should create array when path implies index', async () => {
      const service = await getService();
      const record = { redboxOid: '1' };
      const newRecord = service.setPath(record, 'items[0].name', 'foo');
      expect(Array.isArray(newRecord.items)).to.be.true;
      expect(newRecord.items[0].name).to.equal('foo');
    });
    
    it('should handle null values in path by overwriting them with object/array', async () => {
       const service = await getService();
       const record = { redboxOid: '1', items: null };
       const newRecord = service.setPath(record, 'items.name', 'foo');
       
       expect(newRecord.items).to.not.be.null;
       expect(newRecord.items.name).to.equal('foo');
    });

    it('should correctly handle nulls when creating array path', async () => {
       const service = await getService();
       const record = { redboxOid: '1', items: null };
       const newRecord = service.setPath(record, 'items[0].name', 'foo');

       expect(newRecord.items).to.not.be.null;
       expect(Array.isArray(newRecord.items)).to.be.true;
       expect(newRecord.items[0].name).to.equal('foo');
    });

    it('should preserve other properties', async () => {
        const service = await getService();
        const record = { redboxOid: '1', other: 'data', nested: { foo: 1, bar: 2 } };
        const newRecord = service.setPath(record, 'nested.foo', 3);
        
        expect(newRecord.other).to.equal('data');
        expect(newRecord.nested.bar).to.equal(2);
        expect(newRecord.nested.foo).to.equal(3);
    });
  });
});
