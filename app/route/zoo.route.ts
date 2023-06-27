import * as express from 'express';
import {checkUserRoles, checkUserToken} from "../middleware";
import {ZooController} from "../controller/zoo.controller";
import {RoleEnum} from "../entity";

const router = express.Router();


router.put('/zoo/open', checkUserToken(), checkUserRoles([RoleEnum.ADMIN]), ZooController.canOpen.bind(this));

router.put('/zoo/closed', checkUserToken(), checkUserRoles([RoleEnum.ADMIN]), ZooController.closed.bind(this));

module.exports = router;