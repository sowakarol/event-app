import { stub, restore } from 'sinon';
import chai from 'chai';
import Event from '../../../src/models/event.model';
import { getAll, get } from '../../../src/services/event.service';
import EntityNotFoundError from '../../../src/errors/EntityNotFoundError';

chai.use(require('chai-as-promised'));

const { expect } = chai;

describe('Event Service', () => {
  let mockedEventFind;
  let mockedEventFindByd;

  beforeEach(() => {
    mockedEventFind = stub(Event, 'find');
    mockedEventFindByd = stub(Event, 'findById');
  });

  afterEach(() => {
    restore();
  });

  describe('get method', () => {
    it('should correctly return event', async () => {
      // given
      mockedEventFindByd.returns({
        _id: 'test',
        firstName: 'test',
        lastName: 'test',
      });

      // when
      const event = await get('valid-id');

      // then
      expect(Event.findById.called).to.equal(true);
      expect(Event.findById).to.have.been.calledWith('valid-id');
      expect(event.id).to.equal('test');
      expect(event.firstName).to.equal('test');
      expect(event.lastName).to.equal('test');
    });

    it('should correctly throw EntityNotFoundError error when no event was found', async () => {
      // given
      mockedEventFindByd.returns(null);

      // when
      const getFunc = async () => get('invalid-id');

      // then
      expect(getFunc()).to.eventually.be.rejectedWith(EntityNotFoundError, 'Event with id invalid-id not found');
      expect(Event.findById.called).to.equal(true);
      expect(Event.findById).to.have.been.calledWith('invalid-id');
    });
  });

  describe('getAll method', () => {
    it('should getAll events and map their fields', async () => {
      // given
      mockedEventFind.returns([{ _id: 'ID' }, { _id: 'ID2' }]);

      // when
      const events = await getAll();

      // then
      expect(Event.find.called).to.equal(true);
      expect(events[0]).to.have.property('id');
      expect(events[0].id).to.equal('ID');
    });

    it('should return empty array if no events are found', async () => {
      // given
      mockedEventFind.returns([]);

      // when
      const events = await getAll();

      // then
      expect(Event.find.called).to.equal(true);
      expect(events.length).to.equal(0);
    });
  });
});
