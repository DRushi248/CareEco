import mongoose from 'mongoose';

const officerSchema = new mongoose.Schema({
  officerId: { type: String, required: true, unique: true },
  password: String,
  name: String,
  constituency: String,
});

export default mongoose.model('Officer', officerSchema);
