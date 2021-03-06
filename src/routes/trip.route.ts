import { Router } from 'express';
import { check } from 'express-validator';
import { ErrorConstant } from '../constants/errors.constants';
import { getTrips, postTrips } from '../controllers/trip.controller';

const router = Router();

router.get('/', getTrips);
router.post('/', [
    check('readings.*.time').not().isEmpty().withMessage(ErrorConstant.TIME_REQUIRED),
    check('readings').isArray({ min: 5}).withMessage(ErrorConstant.READINGS_NUMBER)
], postTrips);


export default router;