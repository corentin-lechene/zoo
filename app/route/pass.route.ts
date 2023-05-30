import * as express from 'express';
import {PassController} from "../controller/pass.controller";
import {checkUserRoles, checkUserToken} from "../middleware";
import {RoleEnum} from "../entity";

const router = express.Router();


router.get('/passes/', checkUserToken(), PassController.fetchAllPasses.bind(this));

router.get('/passes/:pass_id', checkUserToken(), PassController.fetchPass.bind(this));

router.post('/passes', express.json(), checkUserToken(), checkUserRoles([RoleEnum.ADMIN]), PassController.createPass.bind(this));

router.delete('/passes/:pass_id', checkUserToken(), checkUserRoles([RoleEnum.ADMIN]), PassController.deletePass.bind(this));


module.exports = router;