import Station from '../models/station'; //eslint-disable-line
import * as DateManager from '../util/dateManager';


async function getHourlySnapshots(from, to, kioskId) { //eslint-disable-line
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
    return {
      at: _entry.at,
      station,
      weather: _entry.weather,
    };
  });

  return result;
}

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

  return stations;
}

export async function getSnapShots(from, to, kioskId, frequency = 'hourly') {
  if (frequency === 'hourly') {
    const snapshots = await getHourlySnapshots(from, to, kioskId);
    return snapshots;
  }

  const snapshots = await getDailySnapShots(from, to, kioskId);
  return snapshots;
}
