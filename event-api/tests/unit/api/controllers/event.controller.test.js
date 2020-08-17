import { CREATED, OK } from "http-status";
import { expect } from "chai";
import { stub, spy, assert } from "sinon";
import { EventController } from "../../../../src/api/controllers/event.controller";

describe("Event Controller", () => {
  let serviceMock = {};

  let req = {};
  let res = {};
  let next = {};
  
  beforeEach(() => {
    req = {};
    res = {
      status: stub().returns({ json: stub().returns({ end: spy() }) }),
    };
    next = spy();
    serviceMock = {
      create: spy(),
    };
  });

  describe("createEvent", () => {
    it("should not fail and return 201 when request.body is ok", async () => {
      const eventController = new EventController(serviceMock);

      await eventController.createEvent(req, res, next);

      expect(serviceMock.create.calledOnce).to.equal(true);

      expect(res.status.calledOnce).to.equal(true);
      expect(res.status.getCall(0).args[0]).to.equal(CREATED);
    });

    it("should call next when eventService throws", async () => {
      serviceMock.create = stub().throws();
      const eventController = new EventController(serviceMock);

      await eventController.createEvent(req, res, next);

      expect(serviceMock.create.calledOnce).to.equal(true);

      expect(next.calledOnce).to.equal(true);
    });
  });
});
