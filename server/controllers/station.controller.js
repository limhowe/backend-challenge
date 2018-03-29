import Station from '../models/station';
import Entry from '../models/entry';
import * as DateManager from '../util/dateManager';
import * as StationService from '../services/station.service';

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
      at: {
        $gte: nextTickDates.current,
        $lt: nextTickDates.next,
      },
    }, { stations: 1, weather: 1 })
      .populate('stations', '-_id -__v -at')
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
    at: {
      $gte: nextTickDates.current,
      $lt: nextTickDates.next,
    },
  }, { weather: 1, at: 1 })
  .exec();
  if (!entry) { return null; }

  const station = await Station.findOne({
    kioskId,
    at: entry.at,
  }, { _id: 0, __v: 0 })
  .exec();
  if (!station) { return null; }

  return {
    station,
    weather: entry.weather,
  };
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
      const data = await StationService.getSnapShots(req.query.from, req.query.to, req.params.kioskId, req.query.frequency);
      if (!data) {
        res.status(404).send('Not found requeted data');
      } else {
        res.json(data);
      }
    }
  } catch (err) {
    res.status(500).send(err);
  }
}
