import { stub, match } from 'sinon';
import chai from 'chai';

import errorHandler from '../../../../src/api/middlewares/errorHandler';
import ValidationError from '../../../../src/errors/ValidationError';
import StatusCodeError from '../../../../src/errors/StatusCodeError';
import EntityNotFoundError from '../../../../src/errors/EntityNotFoundError';

chai.use(require('sinon-chai'));

const { expect } = chai;

describe('Error Handler', () => {
  it('should result in internal error for default error', () => {
    const mockedResponseJsonProperty = stub();
    const mockedResponse = {
      status: stub().returns({ json: mockedResponseJsonProperty }),
    };

    errorHandler(new Error('unknown'), null, mockedResponse, null);

    expect(mockedResponse.status).to.have.been.calledWith(500);
    expect(mockedResponseJsonProperty).to.have.been.calledWith(match.has('message', 'Internal error'));
  });

  it('should result in bad request error for validation error', () => {
    const mockedResponse = {
      status: stub().returns({ json: stub() }),
    };

    errorHandler(new ValidationError('unknown', []), null, mockedResponse, null);

    expect(mockedResponse.status).to.have.been.calledWith(400);
  });

  it('should result in not found error for entity not found error', () => {
    const mockedResponse = {
      status: stub().returns({ json: stub() }),
    };

    errorHandler(new EntityNotFoundError('test', 'test'), null, mockedResponse, null);

    expect(mockedResponse.status).to.have.been.calledWith(404);
  });

  it('should result in custom http error for status code error', () => {
    const mockedResponse = {
      status: stub().returns({ json: stub() }),
    };

    errorHandler(new StatusCodeError('test', 415), null, mockedResponse, null);

    expect(mockedResponse.status).to.have.been.calledWith(415);
  });
});
