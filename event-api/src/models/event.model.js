import { Schema, model } from 'mongoose';

// taken from https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

const EventSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'First Name is required!'],
    trim: true,
    maxlength: 100,
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required!'],
    trim: true,
    maxlength: 100,
  },
  email: {
    type: String,
    required: [true, 'Email is required!'],
    trim: true,
    lowercase: true,
    maxlength: 100,
    validate: [validateEmail, 'Email address is invalid!'],
  },
  eventDate: {
    type: Date,
    required: [true, 'Event Date is required!'],
  },
});

export default model('event', EventSchema);
