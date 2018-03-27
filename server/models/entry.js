import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const entrySchema = new Schema({
  dataAt: { type: Schema.Types.Date, default: Date.now, required: true },
  stations: [{ type: Schema.Types.ObjectId, ref: 'Station' }],
  weather: { type: Schema.Types.ObjectId, ref: 'Weather' },
});

export default mongoose.model('Entry', entrySchema);
