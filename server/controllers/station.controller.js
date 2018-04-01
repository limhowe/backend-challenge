import * as StationService from '../services/station.service';

/**
 * Get snapshots for all stations
 * @param req
 * @param res
 * @returns void
 */
export async function getStations(req, res) {
  try {
    const data = await StationService.getAllStations(req.query.at);
    if (!data) {
      res.status(404).json({
        err: {
          code: 404,
          msg: 'Not found requeted data',
        },
      });
    } else {
      res.json(data);
    }
  } catch (err) {
    res.status(500).send(err);
  }
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
      const data = await StationService.getSingleSnapShot(req.query.at, req.params.kioskId);
      if (!data) {
        res.status(404).json({
          err: {
            code: 404,
            msg: 'Not found requeted data',
          },
        });
      } else {
        res.json(data);
      }
    } else {
      const data = await StationService.getSnapShots(req.query.from, req.query.to, req.params.kioskId, req.query.frequency);
      if (!data) {
        res.status(404).json({
          err: {
            code: 404,
            msg: 'Not found requeted data',
          },
        });
      } else {
        res.json(data);
      }
    }
  } catch (err) {
    res.status(500).send(err);
  }
}
