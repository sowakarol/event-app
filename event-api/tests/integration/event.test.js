/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import {
  CREATED, OK, BAD_REQUEST, NOT_FOUND,
} from 'http-status';
import { expect } from 'chai';
import app from '../../src/app';
import Event from '../../src/models/event.model';

const cleanUpDatabase = async () => {
  await Event.deleteMany({});
};

describe('Event API', () => {
  const NEW_ENTITY = {
    _id: '5f3957a73f62a60012ae2359',
    firstName: 'TEST',
    lastName: 'TEST',
    email: 'test@domain.com',
    eventDate: new Date(1995, 11, 17, 3, 24, 0).toJSON(),
  };

  beforeEach(async () => {
    await cleanUpDatabase();
  });

  describe('GET api/_healtcheck', () => {
    it('should respond with OK 200 status', async () => {
      await request(app).get('/api/_healthcheck').expect(OK);
    });
  });

  describe('POST /api/v1/events/', () => {
    it('should create a new event when request is ok', async () => {
      const date = new Date(1995, 11, 17, 3, 24, 0).toJSON();
      const res = await request(app)
        .post('/api/v1/events/')
        .send({
          firstName: 'test',
          lastName: 'test',
          email: 'test@test.pl',
          eventDate: date,
        })
        .expect(CREATED);

      expect(res.status).to.equal(CREATED);
      expect(res.body).to.have.property('id');
      expect(res.body).to.have.property('firstName', 'test');
      expect(res.body).to.have.property('lastName', 'test');
      expect(res.body).to.have.property('email', 'test@test.pl');
      expect(res.body).to.have.property('eventDate', date);
    });

    describe('should respond 400 when', () => {
      it('request does not have eventDate field', async () => {
        const res = await request(app)
          .post('/api/v1/events/')
          .send({
            firstName: 'test',
            lastName: 'test',
            email: 'test@test.pl',
          })
          .expect(BAD_REQUEST);

        expect(res.body).to.have.property('message', 'Validation Error');
        expect(res.body).to.have.property('errors');
        expect(res.body.errors.length).to.equal(1);

        const validationError = res.body.errors[0];
        expect(validationError).to.have.property('field', 'eventDate');
        expect(validationError).to.have.property('message', '"eventDate" is required');
      });

      it('request does not have firstName field', async () => {
        const res = await request(app)
          .post('/api/v1/events/')
          .send({
            lastName: 'test',
            email: 'test@test.pl',
            eventDate: new Date(1995, 11, 17, 3, 24, 0).toJSON(),
          })
          .expect(BAD_REQUEST);

        expect(res.body).to.have.property('message', 'Validation Error');
        expect(res.body).to.have.property('errors');
        expect(res.body.errors.length).to.equal(1);

        const validationError = res.body.errors[0];
        expect(validationError).to.have.property('field', 'firstName');
        expect(validationError).to.have.property('message', '"firstName" is required');
      });
    });
  });

  describe('GET /api/v1/events/', () => {
    it('should retrieve empty list when no events are saved', async () => {
      const res = await request(app).get('/api/v1/events/').expect(OK);
      expect(res.body).to.be.a('array');
      expect(res.body.length).to.equal(0);
    });

    it('should correctly retrieve mapped event from DB', async () => {
      const event = new Event({ ...NEW_ENTITY });
      await event.save();

      const res = await request(app).get('/api/v1/events/').expect(OK);
      expect(res.body).to.be.a('array');
      expect(res.body.length).to.equal(1);
      const item = res.body[0];
      expect(item).to.have.property('id', NEW_ENTITY._id);
      expect(item).to.have.property('firstName');
      expect(item).to.have.property('lastName');
      expect(item).to.have.property('email');
      expect(item).to.have.property('eventDate');
    });

    it('should correctly retrieve mapped events from DB', async () => {
      // populate db with SIZE number of events
      const SIZE = 3;

      const events = [];
      for (let i = 0; i < SIZE; i += 1) {
        const eventTemplate = { ...NEW_ENTITY };
        delete eventTemplate._id;

        events.push(eventTemplate);
      }

      await Promise.all(events.map((event) => new Event(event).save()));

      const res = await request(app).get('/api/v1/events/').expect(OK);
      expect(res.body).to.be.a('array');
      expect(res.body.length).to.equal(SIZE);
      const item = res.body[0];
      expect(item).to.have.property('id');
      expect(item).to.have.property('firstName');
      expect(item).to.have.property('lastName');
      expect(item).to.have.property('email');
      expect(item).to.have.property('eventDate');
    });
  });

  describe('GET /api/v1/events/:id', () => {
    it('should correctly retrieve event from DB', async () => {
      const entity = { ...NEW_ENTITY };
      const event = new Event({ ...NEW_ENTITY });
      await event.save();

      const res = await request(app).get(`/api/v1/events/${entity._id}`).expect(OK);

      expect(res.body).to.have.property('id', NEW_ENTITY._id);
      expect(res.body).to.have.property('firstName');
      expect(res.body).to.have.property('lastName');
      expect(res.body).to.have.property('email');
      expect(res.body).to.have.property('eventDate');
    });

    it('should return 404 when event does not exist in DB', async () => {
      const res = await request(app).get('/api/v1/events/5f3957a73f62a60012ae0000').expect(NOT_FOUND);

      expect(res.body).to.have.property('message', 'Event with id 5f3957a73f62a60012ae0000 not found');
    });

    it('should return 400 when id cannot be casted', async () => {
      const res = await request(app).get('/api/v1/events/not-existing-test-id').expect(BAD_REQUEST);

      expect(res.body).to.have.property('message', 'Validation Error');
      expect(res.body).to.have.property('errors');
      expect(res.body.errors.length).to.equal(1);

      const validationError = res.body.errors[0];
      expect(validationError).to.have.property('field', 'id');
      expect(validationError).to.have.property('message', 'Invalid "id" parameter');
      expect(validationError).to.have.property('invalidValue', 'not-existing-test-id');
    });
  });
  describe('DELETE /api/v1/events/:id', () => {
    it('should correctly delete event from DB', async () => {
      const event = new Event({ ...NEW_ENTITY });
      await event.save();

      await request(app)
        .delete(`/api/v1/events/${NEW_ENTITY._id}`)
        .expect(OK);

      const response = await Event.findById(NEW_ENTITY._id);
      expect(response).to.equal(null);
    });
  });

  describe('UPDATE /api/v1/events/:id', () => {
    it('should correctly delete event from DB', async () => {
      const event = new Event({ ...NEW_ENTITY });
      await event.save();

      const date = new Date().toJSON();

      const res = await request(app)
        .put(`/api/v1/events/${NEW_ENTITY._id}`)
        .send({
          firstName: 'test-updated',
          lastName: 'test-updated',
          email: 'test-updated@test.pl',
          eventDate: date,
        })
        .expect(OK);

      const entityInDB = await Event.findById(NEW_ENTITY._id);
      expect(entityInDB).to.have.property('firstName', 'test-updated');
      expect(entityInDB).to.have.property('lastName', 'test-updated');
      expect(entityInDB).to.have.property('email', 'test-updated@test.pl');
      expect(entityInDB).to.have.property('eventDate');
      expect(new Date(entityInDB.eventDate).toJSON()).to.equal(date);

      expect(res.body).to.have.property('id', NEW_ENTITY._id);
      expect(res.body).to.have.property('firstName', 'test-updated');
      expect(res.body).to.have.property('lastName', 'test-updated');
      expect(res.body).to.have.property('email', 'test-updated@test.pl');
      expect(res.body).to.have.property('eventDate', date);
    });
  });
});
