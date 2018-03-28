import mongoose from 'mongoose';
import mockgoose from 'mockgoose';

export async function connectDB(t) {
  try {
    await mockgoose(mongoose);
    await mongoose.createConnection('mongodb://localhost:27017/mern-test');
  } catch (erre) {
    t.fail('Unable to connect to test database');
  }
}

export async function dropDB(t) {
  try {
    mockgoose.reset();
  } catch (err) {
    if (err) t.fail('Unable to reset test database');
  }
}
