import { CREATED, OK } from "http-status";
import { expect } from "chai";
import { EventController } from "../../../../src/api/controllers/event.controller";
import { stub, spy } from "sinon";

describe("Event Controller", () => {
  let serviceMock = {
    create: spy(),
  };
  let eventController = new EventController(serviceMock);

  let req = {};
  let res = {};
  let event = {
    firstName: "test",
    lastName: "test",
    email: "test@test.pl",
    eventDate: new Date(1995, 11, 17, 3, 24, 0).toJSON(),
  };

  beforeEach(() => {
    req = {};
    res = {
      json: spy(),
      status: stub().returns({ end: spy() }),
    };
  });

  describe("createEvent", () => {
    it("should not fail and return event when request.body is ok", async () => {
      req.body = event;
      await eventController.createEvent(req, res);

      expect(serviceMock.create.calledOnce).to.equal(true);
      expect(res.status.calledWith).to.equal(CREATED);

      expect(res.body).to.have.property("firstName", "test");
      expect(res.body).to.have.property("lastName", "test");
      expect(res.body).to.have.property("email", "test@test.pl");
      expect(res.body).to.have.property(
        "eventDate",
        "1995-12-17T02:24:00.000Z"
      );
    });
  });
});
