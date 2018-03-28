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
      Station.create(stations.time0),
      Station.create(stations.time1),
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

test.serial('Should check if given time is ISO 8601 string', async t => {
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
    .get('/api/stations?at=2018-03-26T22:40:00.508Z')
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.deepEqual(stations.time0.length, res.body.stations.length);
});


test.serial('Should return 404 when no data', async t => {
  t.plan(1);

  const res = await request(app)
    .get('/api/stations?at=2014-01-02T11:00:00.508Z')
    .set('Accept', 'application/json');
  t.is(res.status, 404);
});
