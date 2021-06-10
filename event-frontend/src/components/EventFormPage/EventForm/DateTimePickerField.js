import React from 'react';
import PropTypes from 'prop-types';
import { DateTimePicker } from '@material-ui/pickers';
import { useField } from 'formik';

const DateTimePickerField = ({
  label,
  required = false,
  fullWidth = false,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);

  return (
    <DateTimePicker
      label={label}
      name={field.name}
      value={field.value}
      helperText={meta.error}
      error={meta.touched && Boolean(meta.error)}
      onChange={(newValue) => helpers.setValue(newValue)}
      required={required}
      fullWidth={fullWidth}
    />
  );
};

DateTimePickerField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  fullWidth: PropTypes.bool,
};

export default DateTimePickerField;
