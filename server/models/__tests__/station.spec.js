import test from 'ava';
import request from 'supertest';
import app from '../../server';
import Station from '../station';
import { connectDB, dropDB } from '../../util/test-helpers';

// Initial stations added into test db
const stations = [
  new Station({ name: 'Prashant', title: 'Hello Mern', slug: 'hello-mern', cuid: 'f34gb2bh24b24b2', content: "All cats meow 'mern!'" }),
  new Station({ name: 'Mayank', title: 'Hi Mern', slug: 'hi-mern', cuid: 'f34gb2bh24b24b3', content: "All dogs bark 'mern!'" }),
];

test.beforeEach('connect and add two station entries', t => {
  connectDB(t, () => {
    Station.create(stations, err => {
      if (err) t.fail('Unable to create stations');
    });
  });
});

test.afterEach.always(t => {
  dropDB(t);
});

test.serial('Should correctly give number of Stations', async t => {
  t.plan(2);

  const res = await request(app)
    .get('/api/stations')
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.deepEqual(stations.length, res.body.stations.length);
});

test.serial('Should send correct data when queried against a cuid', async t => {
  t.plan(2);

  const station = new Station({ name: 'Foo', title: 'bar', slug: 'bar', cuid: 'f34gb2bh24b24b2', content: 'Hello Mern says Foo' });
  station.save();

  const res = await request(app)
    .get('/api/stations/f34gb2bh24b24b2')
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.is(res.body.station.name, station.name);
});

test.serial('Should correctly add a station', async t => {
  t.plan(2);

  const res = await request(app)
    .station('/api/stations')
    .send({ station: { name: 'Foo', title: 'bar', content: 'Hello Mern says Foo' } })
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const savedStation = await Station.findOne({ title: 'bar' }).exec();
  t.is(savedStation.name, 'Foo');
});

test.serial('Should correctly delete a station', async t => {
  t.plan(2);

  const station = new Station({ name: 'Foo', title: 'bar', slug: 'bar', cuid: 'f34gb2bh24b24b2', content: 'Hello Mern says Foo' });
  station.save();

  const res = await request(app)
    .delete(`/api/stations/${station.cuid}`)
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const queriedStation = await Station.findOne({ cuid: station.cuid }).exec();
  t.is(queriedStation, null);
});
