const mapJoiError = ({
  message, context,
}) => ({
  field: context.key,
  message,
  invalidValue: context.value,
});

const mapJoiErrors = (details) => details && details.map(mapJoiError);

export default mapJoiErrors;
