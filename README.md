# event-app

The event application consists of:

- Event API - (Node.js + Express)
- Event frontend application - a simple form for adding an event (React)
- Event database (MongoDB)

## Event API Reference

Event API is a REST API for an Event Entity implemented in Node.js and Express.
It lets you Create/Read/Update/Delete Event resources, by exposing following endpoints:

- `GET /api/v1/events/`
- `POST /api/v1/events/`
- `GET /api/v1/events/:id`
- `PUT /api/v1/events/:id`
- `DELETE /api/v1/events/:id`

Event API has integration and unit tests (Mocha + Chai + Sinon).

## Event frontend application

The frontend application enables you to add Event resources in a simple Event Form. Written in React, Formik and Material UI.

## Example

This section contains sample commands that start the application or tests. `npm` and `docker-compose` tools are required.

### Step 0: Install dependencies

Before starting the application stack, install dependencies of `event-api` and `event-frontend`:
```bash
cd event-api/
npm i
```

```bash
cd event-frontend/
npm i
```
 
### Starting application stack

To start the whole stack (frontend app + Event API + database with mongo-express), type the following command:

```bash
docker-compose up
```

Then, the application frontend will be available from the browser at `localhost:3000` address.
Furthermore, MongoDB web-panel can be accessed from `localhost:8081`, Event API at `localhost:5000`.

To retrieve all created Events from the Event API:

```bash
curl localhost:5000/api/v1/events/
```

### Starting Event API tests

In order to start Event API integration/unit tests, type:

```bash
cd ./event-api
npm run test:{integration|unit}
```

`test:integration` command uses `docker-compose` to start a MongoDB container and invokes integration tests with mocha.

## Important Notes

Validation of Event resource takes place:

1. In the frontend application (`Yup`)
2. In the backend application (`Joi`)
3. In MongoDB schema

### Validation of eventDate field

There is no special validation of event dates. They can be either from the past or from the future.
I have assumed that some users would want to add an event that has already happened for some kind of historical needs.

## Technologies

- Node.js
- Express
- Docker (+ Docker Compose)
- React
- Formik
- Yup
- Joi
- Material UI
- MongoDB
- Web-based MongoDB admin interface (mongo-express)

## Future Works

- add swagger
- JWT authentication
