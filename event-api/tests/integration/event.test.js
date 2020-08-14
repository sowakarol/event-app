import request from "supertest";
import { CREATED, OK } from "http-status";
import { expect } from "chai";
import app from "../../src/app";

describe("Event API", () => {
  describe("POST /api/v1/events/", () => {
    it("should create a new event when request is ok", async () => {
      const res = await request(app)
        .post("/api/v1/events/")
        .send({
          firstName: "test",
          lastName: "test",
          email: "test@test.pl",
          eventDate: new Date(1995, 11, 17, 3, 24, 0).toJSON(),
        })
        .expect(CREATED);
      expect(res.status).to.equal(CREATED);
      expect(res.body).to.have.property("firstName", "test");
      expect(res.body).to.have.property("lastName", "test");
      expect(res.body).to.have.property("email", "test@test.pl");
      expect(res.body).to.have.property(
        "eventDate",
        "1995-12-17T02:24:00.000Z"
      );
    });
  });

  describe("GET /api/v1/events/1", () => {
    it("should create a new event when request is ok", async () => {
      const res = await request(app).get("/api/v1/events/1").expect(OK);
      expect(res.status).to.equal(OK);
      expect(res.body).to.have.property("firstName");
      expect(res.body).to.have.property("lastName");
      expect(res.body).to.have.property("email");
      expect(res.body).to.have.property("eventDate");
    });
  });
});
