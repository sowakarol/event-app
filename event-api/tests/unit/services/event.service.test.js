import { stub } from 'sinon';
import { expect } from 'chai';
import Event from '../../../src/models/event.model';
import { getAll } from '../../../src/services/event.service';

describe('Event Service', () => {
  // mocked Event model
  beforeEach(() => {
    Event.find = stub().returns([{ _id: 'ID' }, { _id: 'ID2' }]);
  });

  describe('getAll method', () => {
    it('should getAll events and map their fields', async () => {
      const events = await getAll();
      expect(Event.find.called).to.equal(true);
      expect(events[0]).to.have.property('id');
      expect(events[0].id).to.equal('ID');
    });
  });
});