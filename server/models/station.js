import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const stationSchema = new Schema({
  _entry: { type: Schema.Types.ObjectId, ref: 'Entry' },
  kioskId: { type: Schema.Types.String, required: true },
  name: { type: Schema.Types.String, required: true },
  addressCity: { type: Schema.Types.String, required: true },
  addressState: { type: Schema.Types.String, required: true },
  addressZipCode: { type: Schema.Types.String, required: true },
  bikesAvailable: { type: Schema.Types.Number, required: true },
  totalDocks: { type: Schema.Types.Number, required: true },
  kioskType: { type: Schema.Types.Number, required: true },
  kioskPublicStatus: { type: Schema.Types.String, required: true },
  kioskStatus: { type: Schema.Types.String, required: true },
  at: { type: Schema.Types.Date, default: Date.now, required: true },
});

export default mongoose.model('Station', stationSchema);
