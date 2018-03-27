import { Router } from 'express';
require('express-async-errors');
const { oneOf, query, validationResult } = require('express-validator/check');
import * as StationController from '../controllers/station.controller';

const router = new Router();

const validateHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.mapped() });
  } else {
    next();
  }
};

// Get all Stations
router.route('/stations/').get([query('at').isISO8601()], validateHandler, StationController.getStations);

// Get one station by kioskId
router.route('/stations/:kioskId').get(oneOf([
  [
    query('from').isISO8601(),
    query('to').isISO8601(),
    query('frequency').optional().isIn(['daily', 'hourly']),
  ],
  query('at').isISO8601(),
]), validateHandler, StationController.getStation);

export default router;
