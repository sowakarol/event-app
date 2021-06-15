import { stub, match } from 'sinon';
import chai from 'chai';
import eventValidation from '../../../src/validators/event.validator';
import ValidationError from '../../../src/errors/ValidationError';

chai.use(require('sinon-chai'));

const { expect } = chai;

describe('Event Validation', () => {
  it('should pass the validation and pass result to the next middleware', () => {
    const sampleRequest = {
      body: {
        firstName: 'Test',
        lastName: 'Test',
        email: 'test@email.com',
        eventDate: new Date(),
      },
    };

    const next = stub();

    eventValidation(sampleRequest, null, next);
    expect(next).to.have.been.calledWith();
  });

  it('should trim passed values', () => {
    const sampleRequest = {
      body: {
        firstName: '   Test   ',
        lastName: '   Test   ',
        email: '    test@email.com    ',
        eventDate: new Date(),
      },
    };

    const next = stub();

    eventValidation(sampleRequest, null, next);

    expect(next).to.have.been.calledWith();
    expect(sampleRequest.validatedEntity.firstName).to.equal('Test');
    expect(sampleRequest.validatedEntity.lastName).to.equal('Test');
    expect(sampleRequest.validatedEntity.email).to.equal('test@email.com');
    expect(sampleRequest.validatedEntity.eventDate).to.equal(sampleRequest.body.eventDate);
  });

  it('should pass error on invalid email', () => {
    const invalidRequest = {
      body: {
        firstName: 'Test',
        lastName: 'Test',
        email: 'invalid',
        eventDate: new Date(),
      },
    };

    const next = stub();

    eventValidation(invalidRequest, null, next);
    expect(next).to.have.been.calledWith(
      match.instanceOf(ValidationError)
        .and(
          match.has('errors', [{
            invalidValue: 'invalid',
            field: 'email',
            message: '"email" must be a valid email',
          }]),
        )
        .and(
          match.has('message', 'Validation Error'),
        )
        .and(
          match.has('statusCode', 400),
        ),
    );
  });
});
