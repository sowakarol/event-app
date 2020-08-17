import { stub } from "sinon";
import { expect } from "chai";
import { Event } from "../../../../src/api/models/event.model";
import { EventService } from "../../../../src/api/services/event.service";

describe("Event Service", () => {
  const eventService = new EventService();

  // mocked Event model
  beforeEach(() => {
    Event.find = stub().returns([{ _id: "ID" }, { _id: "ID2" }]);
  });

  describe("getAll method", () => {
    it("should getAll events and map their fields", async () => {
      const events = await eventService.getAll();
      expect(Event.find.called).to.equal(true);
      expect(events[0]).to.have.property("id");
    });
  });
});
