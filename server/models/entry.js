import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const weatherSchema = new Schema({
  main: { type: Schema.Types.Mixed, required: true },
  weather: { type: Schema.Types.Mixed, required: true },
  wind: { type: Schema.Types.Mixed, required: true },
  clouds: { type: Schema.Types.Mixed, required: true },
});

const entrySchema = new Schema({
  at: { type: Schema.Types.Date, default: Date.now, required: true },
  stations: [{ type: Schema.Types.ObjectId, ref: 'Station' }],
  weather: weatherSchema,
});

export default mongoose.model('Entry', entrySchema);
