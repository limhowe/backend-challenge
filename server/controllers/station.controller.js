import Station from '../models/station'; //eslint-disable-line
import Weather from '../models/weather'; //eslint-disable-line
import Entry from '../models/entry';

/**
 * Get all stations
 * @param req
 * @param res
 * @returns void
 */
export async function getStations(req, res) {
  try {
    const entry = await Entry.findOne({}, { stations: 1, weather: 1 })
      .populate('stations', '-_id -__v -dataAt')
      .populate('weather', '-_id -__v -dataAt')
      .exec();
    res.json({
      stations: entry.stations,
      weather: entry.weather,
    });
  } catch (err) {
    res.status(500).send(err);
  }
}

/**
 * Get a single station
 * @param req
 * @param res
 * @returns void
 */
export async function getStation(req, res) {
  if (req.query.at) {
    res.json({
      at: true,
    });
  } else {
    res.json({
      from: true,
    });
  }
}
