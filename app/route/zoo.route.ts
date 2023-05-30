import * as express from 'express';
import {checkUserToken} from "../middleware";
import {ZooController} from "../controller/zoo.controller";

const router = express.Router();


router.get('/zoo/can-open', checkUserToken(), ZooController.canOpen.bind(this));

module.exports = router;