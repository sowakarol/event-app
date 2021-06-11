import { CREATED } from 'http-status';
import { expect } from 'chai';
import { stub, spy } from 'sinon';
import { createEvent } from '../../../../../src/api/routes/v1/event.route';

import * as eventService from '../../../../../src/api/services/event.service';

describe('Event Controller', () => {
  let res = {};
  let next = {};

  const sampleCorrectPayload = {
    firstName: 'First',
    lastName: 'Last',
    eventDate: new Date(),
    email: 'sample@test.com',
  };

  beforeEach(() => {
    eventService.create = stub().returns(null);
    res = {
      status: stub().returns({ json: stub().returns({ end: spy() }) }),
    };
    next = spy();
  });

  describe('createEvent', () => {
    it('should pass with 201 when request is ok', async () => {
      // given
      const req = {
        body: sampleCorrectPayload,
      };

      // when
      await createEvent(req, res, next);

      // then
      expect(res.status.calledOnce).to.equal(true);
      expect(res.status.getCall(0).args[0]).to.equal(CREATED);
    });
  });
});
