import * as express from 'express';
import {PassController} from "../controller/pass.controller";

const router = express.Router();


router.get('/passes/', PassController.fetchAllPasses.bind(this));

router.get('/passes/:pass_id', PassController.fetchPass.bind(this));

router.post('/passes', express.json(), PassController.createPass.bind(this));

router.delete('/passes/:pass_id', PassController.deletePass.bind(this));


module.exports = router;