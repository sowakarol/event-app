import axios from 'axios';
import createEvent from '../createEvent.service';

jest.mock('axios');

test('Should properly call mocked endpoint', async () => {
  // given
  const samplePayload = {
    test: 'TEST',
  };
  axios.post.mockResolvedValue({ status: 201 });

  // when
  const resp = await createEvent(samplePayload);

  // then
  expect(resp).toEqual({ status: 201 });
  expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/api/v1/events', samplePayload);
});
