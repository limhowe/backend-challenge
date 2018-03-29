import test from 'ava';
import request from 'supertest';
import app from '../../server';
import Station from '../../models/station';
import Entry from '../../models/entry';
import { connectDB, dropDB } from '../../util/test-helpers';

// Initial data to be added into test db
import { stations, entries } from '../../util/dummyData';

test.beforeEach('connect and add test data', async t => {
  await connectDB(t);
  try {
    await Promise.all([
      Station.create(stations.time0),
      Station.create(stations.time1),
      Station.create(stations.time2),
      Entry.create(entries),
    ]);
  } catch (err) {
    t.fail('Unable to load test data');
  }
});

test.afterEach.always(async t => {
  await dropDB(t);
});

// test.serial('Should check if given time is ISO 8601 string', async t => {
//   t.plan(1);

//   const res = await request(app)
//     .get('/api/stations?at=wewe')
//     .set('Accept', 'application/json');

//   t.is(res.status, 422);
// });

// test.serial('Should check time parameter absence', async t => {
//   t.plan(1);

//   const res = await request(app)
//     .get('/api/stations')
//     .set('Accept', 'application/json');

//   t.is(res.status, 422);
// });

// test.serial('Should correctly give Stations data', async t => {
//   t.plan(2);

//   const res = await request(app)
//     .get('/api/stations?at=2018-03-26T22:40:00.508Z')
//     .set('Accept', 'application/json');

//   t.is(res.status, 200);
//   t.deepEqual(stations.time0.length, res.body.stations.length);
// });

// test.serial('Should return 404 when no data', async t => {
//   t.plan(1);

//   const res = await request(app)
//     .get('/api/stations?at=2014-01-02T11:00:00.508Z')
//     .set('Accept', 'application/json');
//   t.is(res.status, 404);
// });

// test.serial('Should return correct station', async t => {
//   t.plan(5);

//   const res = await request(app)
//     .get('/api/stations/3011?at=2018-03-26T22:40:00.508Z')
//     .set('Accept', 'application/json');
//   t.is(res.status, 200);
//   t.deepEqual(stations.time0[1].kioskId, res.body.station.kioskId);
//   t.deepEqual(stations.time0[1].name, res.body.station.name);
//   t.deepEqual(stations.time0[1].totalDocks, res.body.station.totalDocks);
//   t.deepEqual(stations.time0[1].bikesAvailable, res.body.station.bikesAvailable);
// });

// test.serial('Should check if given time is ISO 8601 string for single Station', async t => {
//   t.plan(1);

//   const res = await request(app)
//     .get('/api/stations/3011?at=wewe')
//     .set('Accept', 'application/json');

//   t.is(res.status, 422);
// });

// test.serial('Should check time parameter absence for single Station', async t => {
//   t.plan(1);

//   const res = await request(app)
//     .get('/api/stations/3011')
//     .set('Accept', 'application/json');

//   t.is(res.status, 422);
// });

// test.serial('Should check range is specified for single Station -- Missing To', async t => {
//   t.plan(1);

//   const res = await request(app)
//     .get('/api/stations/3011?from=2018-03-26T22:40:00.508Z')
//     .set('Accept', 'application/json');

//   t.is(res.status, 422);
// });

// test.serial('Should check range is specified for single Station -- Missing From', async t => {
//   t.plan(1);

//   const res = await request(app)
//     .get('/api/stations/3011?to=2018-03-26T22:40:00.508Z')
//     .set('Accept', 'application/json');

//   t.is(res.status, 422);
// });

// test.serial('Should check range is specified with dates for single Station', async t => {
//   t.plan(1);

//   const res = await request(app)
//     .get('/api/stations/3011?from=awfwef&to=awefw')
//     .set('Accept', 'application/json');

//   t.is(res.status, 422);
// });

test.serial('Should correctly return stations for given date range - hourly', async t => {
  t.plan(2);

  const res = await request(app)
    .get('/api/stations/3011?from=2018-03-24T22:40:00.508Z&to=2018-03-29T22:40:00.508Z')
    .set('Accept', 'application/json');
  t.is(res.status, 200);
  t.deepEqual(res.body.length, 3);
});

test.serial('Should correctly return stations for given date range - daily', async t => {
  t.plan(2);

  const res = await request(app)
    .get('/api/stations/3011?from=2018-03-24T22:40:00.508Z&to=2018-03-29T22:40:00.508Z&frequency=daily')
    .set('Accept', 'application/json');
  t.is(res.status, 200);
  t.deepEqual(res.body.length, 2);
});
