import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const weatherSchema = new Schema({
  main: { type: Schema.Types.Mixed, required: true },
  weather: { type: Schema.Types.Mixed, required: true },
  wind: { type: Schema.Types.Mixed, required: true },
  clouds: { type: Schema.Types.Mixed, required: true },
  dataAt: { type: Schema.Types.Date, default: Date.now, required: true },
});

export default mongoose.model('Weather', weatherSchema);
