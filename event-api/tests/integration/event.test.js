import request from 'supertest';
import {
  CREATED, OK, BAD_REQUEST, NOT_FOUND,
} from 'http-status';
import { expect } from 'chai';
import app from '../../src/app';
import { Event } from '../../src/api/models/event.model';

describe('Event API', () => {
  const NEW_ENTITY = {
    _id: '5f3957a73f62a60012ae2359',
    firstName: 'TEST',
    lastName: 'TEST',
    email: 'test@domain.com',
    eventDate: new Date(1995, 11, 17, 3, 24, 0).toJSON(),
  };
  // clean whole DB before each test
  beforeEach(async () => {
    await Event.deleteMany({});
  });

  describe('GET api/_healtcheck', () => {
    it('should respond with OK 200 status', async () => {
      await request(app).get('/api/_healthcheck').expect(OK);
    });
  });

  describe('POST /api/v1/events/', () => {
    it('should create a new event when request is ok', (done) => {
      const date = new Date(1995, 11, 17, 3, 24, 0).toJSON();
      request(app)
        .post('/api/v1/events/')
        .send({
          firstName: 'test',
          lastName: 'test',
          email: 'test@test.pl',
          eventDate: date,
        })
        .expect(CREATED)
        .then((res) => {
          expect(res.status).to.equal(CREATED);
          expect(res.body).to.have.property('id');
          expect(res.body).to.have.property('firstName', 'test');
          expect(res.body).to.have.property('lastName', 'test');
          expect(res.body).to.have.property('email', 'test@test.pl');
          expect(res.body).to.have.property('eventDate', date);
          done();
        });
    });

    describe('should respond 400 when', () => {
      it('request does not have eventDate field', async () => {
        await request(app)
          .post('/api/v1/events/')
          .send({
            firstName: 'test',
            lastName: 'test',
            email: 'test@test.pl',
          })
          .expect(BAD_REQUEST);
      });

      it('request does not have firstName field', async () => {
        await request(app)
          .post('/api/v1/events/')
          .send({
            lastName: 'test',
            email: 'test@test.pl',
            eventDate: new Date(1995, 11, 17, 3, 24, 0).toJSON(),
          })
          .expect(BAD_REQUEST);
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

      for (let i = 0; i < SIZE; i++) {
        const eventTemplate = { ...NEW_ENTITY };
        delete eventTemplate._id;

        await new Event(eventTemplate).save();
      }

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
      console.error('entity', entity);
      const event = new Event({ ...NEW_ENTITY });
      await event.save();

      const res = await request(app).get(`/api/v1/events/${entity._id}`);
      expect(res.status).to.equal(OK);
      expect(res.body).to.have.property('id', NEW_ENTITY._id);
      expect(res.body).to.have.property('firstName');
      expect(res.body).to.have.property('lastName');
      expect(res.body).to.have.property('email');
      expect(res.body).to.have.property('eventDate');
    });

    it('should return 404 when event does not exist in DB', async () => {
      const res = await request(app).get(
        '/api/v1/events/5f3957a73f62a60012ae0000',
      );
      expect(res.status).to.equal(NOT_FOUND);
    });

    it('should return 400 when id cannot be casted', async () => {
      const res = await request(app).get('/api/v1/events/not-existing-test-id');

      expect(res.status).to.equal(BAD_REQUEST);
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
      expect(response).to.be.a('null');
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
        // check if entity was updated in DB + response body
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
