import Station from '../models/station';
import Entry from '../models/entry';
import * as DateManager from '../util/dateManager';

/**
 * Get all stations
 * @param at
 * @returns object
 */
export async function getAllStations(at) {
  const nextTickDates = DateManager.getDateOfNextHour(at);
  const entry = await Entry.findOne({
    at: {
      $gte: nextTickDates.current,
      $lt: nextTickDates.next,
    },
  })
  .select('-_id -__v -weather._id')
  .populate('stations', '-_id -__v -at')
  .exec();
  if (!entry) { return null; }

  return {
    at,
    stations: entry.stations,
    weather: entry.weather,
  };
}

/**
 * Get a snapshot of one station at a specific time
 * @param at
 * @param kioskId
 * @returns object
 */
export async function getSingleSnapShot(at, kioskId) {
  const nextTickDates = DateManager.getDateOfNextHour(at);
  /**
   * We're assuming there's one snapshot data per hour.
   * So trying to fetch data via Entry, not via Station directly
   */
  const entry = await Entry.findOne({
    at: {
      $gte: nextTickDates.current,
      $lt: nextTickDates.next,
    },
  })
  .select('-_id -stations -__v -weather._id')
  .exec();
  if (!entry) { return null; }

  const station = await Station.findOne({
    kioskId,
    at: entry.at,
  }, { _id: 0, __v: 0 })
  .exec();
  if (!station) { return null; }

  return {
    at,
    station,
    weather: entry.weather,
  };
}

/**
 * Get Hourly Snapshots of given time range
 * @param from
 * @param to
 * @param kioskId
 * @returns object
 */
async function getHourlySnapshots(from, to, kioskId) {
  const rangeDates = DateManager.getRange(from, to);
  const stations = await Station.find({
    kioskId,
    at: {
      $gte: rangeDates.current,
      $lt: rangeDates.next,
    },
  })
  .select('-_id -__v')
  .populate('_entry', '-_id -__v')
  .exec();

  if (!stations || !stations.map || !stations.length) return null;
  const result = stations.map((item) => {
    const stationData = item.toObject();
    const { _entry, ...station } = stationData;
    if (_entry.weather._id) delete _entry.weather._id;
    return {
      at: _entry.at,
      station,
      weather: _entry.weather,
    };
  });

  return result;
}

/**
 * Get Daily Snapshots of given time range
 * @param from
 * @param to
 * @param kioskId
 * @returns object
 */
async function getDailySnapShots(from, to, kioskId) {
  const rangeDates = DateManager.getRange(from, to);
  const ruleGroup = {
    _id: { month: { $month: '$at' }, day: { $dayOfMonth: '$at' }, year: { $year: '$at' } },
    kioskId: { $first: '$kioskId' },
    name: { $first: 'name' },
    addressCity: { $first: '$addressCity' },
    addressState: { $first: '$addressState' },
    addressZipCode: { $first: '$addressZipCode' },
    bikesAvailable: { $first: '$bikesAvailable' },
    totalDocks: { $first: '$totalDocks' },
    kioskType: { $first: '$kioskType' },
    kioskPublicStatus: { $first: '$kioskPublicStatus' },
    kioskStatus: { $first: '$kioskStatus' },
    at: { $first: '$at' },
  };

  const stations = await Station.aggregate()
    .match({
      kioskId,
      at: {
        $gte: rangeDates.current,
        $lt: rangeDates.next,
      },
    })
    .sort({ at: -1 })
    .group(ruleGroup)
    .exec();

  if (!stations || !stations.map || !stations.length) return null;
  const promises = stations.map((item) => {
    return Entry.findOne({ at: item.at }).select('-_id -stations -__v -weather._id').exec();
  });
  const entries = await Promise.all(promises);
  const result = stations.map((station, i) => {
    const _entry = entries[i].toObject();
    return {
      at: _entry.at,
      station,
      weather: _entry.weather,
    };
  });
  return result;
}

export async function getSnapShots(from, to, kioskId, frequency = 'hourly') {
  if (frequency === 'hourly') {
    const snapshots = await getHourlySnapshots(from, to, kioskId);
    return snapshots;
  }

  const snapshots = await getDailySnapShots(from, to, kioskId);
  return snapshots;
}
