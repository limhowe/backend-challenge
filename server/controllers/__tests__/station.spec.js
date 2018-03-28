import test from 'ava';
import request from 'supertest';
import app from '../../server';
import Station from '../../models/station';
import Weather from '../../models/weather';
import Entry from '../../models/entry';
import { connectDB, dropDB } from '../../util/test-helpers';

// Initial data to be added into test db
import { stations, weathers, entries } from '../../util/dummyData';

test.beforeEach('connect and add test data', async t => {
  await connectDB(t);
  try {
    await Promise.all([
      Station.create(stations),
      Weather.create(weathers),
      Entry.create(entries),
    ]);
  } catch (err) {
    t.fail('Unable to load test data');
  }
});

test.afterEach.always(async t => {
  await dropDB(t);
});

test.serial('Should check if given time is date string', async t => {
  t.plan(1);

  const res = await request(app)
    .get('/api/stations?at=wewe')
    .set('Accept', 'application/json');

  t.is(res.status, 422);
});

test.serial('Should check time parameter absence', async t => {
  t.plan(1);

  const res = await request(app)
    .get('/api/stations')
    .set('Accept', 'application/json');

  t.is(res.status, 422);
});

test.serial('Should correctly give Stations data', async t => {
  t.plan(2);

  const res = await request(app)
    .get('/api/stations?at=2018-03-26T23:00:00.508Z')
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.deepEqual(stations.length, res.body.stations.length);
});
