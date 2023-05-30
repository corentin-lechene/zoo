import * as express from 'express';
import {checkUserRoles, checkUserToken} from "../middleware";
import {ZooController} from "../controller/zoo.controller";
import {RoleEnum} from "../entity";

const router = express.Router();


router.get('/zoo/can-open', checkUserToken(), checkUserRoles([RoleEnum.ADMIN]), ZooController.canOpen.bind(this));

module.exports = router;