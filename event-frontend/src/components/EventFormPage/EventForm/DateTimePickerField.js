import React from 'react';
import PropTypes from 'prop-types';
import { DateTimePicker } from '@material-ui/pickers';
import { useField } from 'formik';

const DateTimePickerField = ({
  label,
  id,
  name,
  required = false,
  fullWidth = false,
}) => {
  const [field, meta, helpers] = useField(name);

  return (
    <DateTimePicker
      id={id}
      label={label}
      name={field.name}
      value={field.value}
      helperText={meta.error}
      error={meta.touched && Boolean(meta.error)}
      onChange={(newValue) => helpers.setValue(newValue)}
      required={required}
      format="dddd, MMMM Do YYYY, h:mm:ss a"
      fullWidth={fullWidth}
    />
  );
};

DateTimePickerField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  fullWidth: PropTypes.bool,
};

export default DateTimePickerField;
