import Station from '../models/station'; //eslint-disable-line
import Weather from '../models/weather'; //eslint-disable-line
import Entry from '../models/entry';
import * as DateManager from '../util/dateManager';

/**
 * Get all stations
 * @param req
 * @param res
 * @returns void
 */
export async function getStations(req, res) {
  const nextTickDates = DateManager.getDateOfNextHour(req.query.at);
  try {
    const entry = await Entry.findOne({
      dataAt: {
        $gte: nextTickDates.current,
        $lt: nextTickDates.next,
      },
    }, { stations: 1, weather: 1 })
      .populate('stations', '-_id -__v -dataAt')
      .populate('weather', '-_id -__v -dataAt')
      .exec();
    if (!entry) {
      res.status(404).send('Not found requeted data');
    } else {
      res.json({
        stations: entry.stations,
        weather: entry.weather,
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

/**
 * Get a snapshot of one station at a specific time
 * @param at
 * @param kioskId
 * @returns object
 */
async function getSingleSnapShot(at, kioskId) {
  const nextTickDates = DateManager.getDateOfNextHour(at);
  /*
    We're assuming there's one snapshot data per hour.
    So trying to fetch data via Entry, not via Station directly
  */
  const entry = await Entry.findOne({
    dataAt: {
      $gte: nextTickDates.current,
      $lt: nextTickDates.next,
    },
  }, { weather: 1, dataAt: 1 })
  .populate('weather', '-_id -__v -dataAt')
  .exec();
  if (!entry) { return null; }

  const station = await Station.findOne({
    kioskId,
    dataAt: entry.dataAt,
  }, { _id: 0, __v: 0 })
  .exec();
  if (!station) { return null; }

  return {
    station,
    weather: entry.weather,
  };
}

/**
 * Get a snapshot of one station at a specific time
 * @param at
 * @param kioskId
 * @returns array
 */
async function geSnapShots(from, to, kioskId, frequency = 'hourly') { // eslint-disable-line
  return [];
}

/**
 * Get snapshots for single station
 * @param req
 * @param res
 * @returns void
 */
export async function getStation(req, res) {
  try {
    if (req.query.at) {
      const data = await getSingleSnapShot(req.query.at, req.params.kioskId);
      if (!data) {
        res.status(404).send('Not found requeted data');
      } else {
        res.json({
          station: data.station,
          weather: data.weather,
        });
      }
    } else {
      const data = geSnapShots(req.query.from, req.query.to, req.params.kioskId, req.query.frequency);
      if (!data) {
        res.status(404).send('Not found requeted data');
      } else {
        res.json({
          stations: data.stations,
          weather: data.weather,
        });
      }
    }
  } catch (err) {
    res.status(500).send(err);
  }
}
