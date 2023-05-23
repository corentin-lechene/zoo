import * as express from 'express';
import {StatisticsController} from "../controller/statistics.controller";

const router = express.Router();

router.get('/statistics', StatisticsController.fetchAll.bind(this));

router.get('/statistics/:space_id', StatisticsController.fetchBySpace.bind(this));

router.get('/statistics/:space_id/:type', StatisticsController.fetchByTypeAndSpace.bind(this));

module.exports = router;