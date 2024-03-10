import mongoose from 'mongoose';

const dataSchema = new mongoose.Schema({
  time: Date,
  message: Object
});

const modelData = mongoose.model('modelData', dataSchema);

export default modelData;
