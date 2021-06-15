import { CREATED } from 'http-status';
import { expect } from 'chai';
import { stub, match, restore } from 'sinon';
import { createEvent, getEvent, getAllEvents } from '../../../../../src/api/routes/v1/event.route';

import * as eventService from '../../../../../src/services/event.service';

describe('Event Controller', () => {
  let res = {};
  let next = {};
  let createStub;
  let getStub;
  let getAllStub;

  const sampleCorrectPayload = {
    firstName: 'First',
    lastName: 'Last',
    eventDate: new Date(),
    email: 'sample@test.com',
  };

  beforeEach(() => {
    createStub = stub(eventService, 'create');
    getStub = stub(eventService, 'get');
    getAllStub = stub(eventService, 'getAll');

    res = {
      status: stub().returns({ json: stub().returns({ end: stub() }) }),
      json: stub(),
    };

    next = stub();
  });

  afterEach(() => {
    restore();
  });

  describe('createEvent', () => {
    it('should pass with 201 when request is ok', async () => {
      // given
      createStub.callsFake(() => null);

      const req = {
        body: sampleCorrectPayload,
      };

      // when
      await createEvent(req, res, next);

      // then
      expect(res.status.calledOnce).to.equal(true);
      expect(res.status.getCall(0).args[0]).to.equal(CREATED);
    });

    it('should pass error to next middleware', async () => {
      // given
      const req = {
        body: sampleCorrectPayload,
      };

      const err = new Error('test');
      createStub.throws(err);

      // when
      await createEvent(req, res, next);

      // then
      expect(next).to.have.been.calledWith(
        match.instanceOf(Error)
          .and(match.has('message', 'test')),
      );
    });
  });

  describe('getEvent', () => {
    it('should respond with event when request is ok', async () => {
      // given
      getStub.callsFake(() => ({ test: 'test' }));

      const req = {
        params: 'sample-id',
      };

      // when
      await getEvent(req, res, next);

      // then
      expect(res.json.getCall(0).args[0]).to.deep.equal({ test: 'test' });
    });

    it('should pass error to next middleware', async () => {
      // given
      const err = new Error('test');
      getStub.throws(err);

      const req = {
        params: 'sample-id',
      };

      // when
      await getEvent(req, res, next);

      // then
      expect(next).to.have.been.calledWith(
        match.instanceOf(Error)
          .and(match.has('message', 'test')),
      );
    });
  });

  describe('getAllEvents', () => {
    it('should respond with all events', async () => {
      // given
      getAllStub.callsFake(() => [
        {
          test: 'test1',
        },
        {
          test: 'test2',
        },
      ]);

      // when
      await getAllEvents({}, res, next);

      // then
      expect(res.json.getCall(0).args[0].length).to.equal(2);
      expect(res.json.getCall(0).args[0][0]).to.deep.equal({ test: 'test1' });
      expect(res.json.getCall(0).args[0][1]).to.deep.equal({ test: 'test2' });
    });

    it('should pass error to next middleware', async () => {
      // given
      const err = new Error('test');
      getAllStub.throws(err);

      // when
      await getAllEvents({}, res, next);

      // then
      expect(next).to.have.been.calledWith(
        match.instanceOf(Error)
          .and(match.has('message', 'test')),
      );
    });
  });
});
