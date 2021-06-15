import React from 'react';
import { Formik } from 'formik';
import moment from 'moment';

import DateTimePickerField from '../DateTimePickerField';
import {
  render, queryByAttribute,
} from '../../../../test.helpers';

test('should be rendered', async () => {
  const field = 'date';
  const label = 'Date';
  const { container } = render(
    <Formik>
      <DateTimePickerField
        name={field}
        id={field}
        label={label}
        required
      />
    </Formik>,
  );

  const input = queryByAttribute('id', container, field);

  expect(input).toBeTruthy();
});

test('should have correct initial value', async () => {
  const field = 'date';
  const label = 'Date';
  const initialValue = moment();
  const { container } = render(
    <Formik
      initialValues={{
        [field]: initialValue.toISOString(),
      }}
    >
      <DateTimePickerField
        name={field}
        id={field}
        label={label}
        required
      />
    </Formik>,
  );

  const input = queryByAttribute('id', container, field);

  expect(input.value).toBe(initialValue.format('dddd, MMMM Do YYYY, h:mm:ss a'));
});
