import { stub, match } from 'sinon';
import chai from 'chai';
import idValidation from '../../../src/validators/id.validator';
import ValidationError from '../../../src/errors/ValidationError';

chai.use(require('sinon-chai'));

const { expect } = chai;

describe('Id Validation', () => {
  it('should pass the validation and pass result to the next middleware', () => {
    const sampleRequest = {
      params: {
        id: '507f1f77bcf86cd799439122',
      },
    };

    const next = stub();

    idValidation(sampleRequest, null, next);
    expect(next).to.have.been.calledWith();
  });

  it('should pass error on invalid id', () => {
    const invalidRequest = {
      params: {
        id: '507f1f77',
      },
    };

    const next = stub();

    idValidation(invalidRequest, null, next);
    expect(next).to.have.been.calledWith(
      match.instanceOf(ValidationError)
        .and(
          match.has('errors', [{
            field: 'id',
            message: 'Invalid "id" parameter',
            invalidValue: '507f1f77',
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

  it('should pass error when no id was passed', () => {
    const invalidRequest = {
      params: {},
    };

    const next = stub();

    idValidation(invalidRequest, null, next);
    expect(next).to.have.been.calledWith(
      match.instanceOf(ValidationError)
        .and(
          match.has('errors', [{
            field: 'id',
            message: '"id" is required',
            invalidValue: null,
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
