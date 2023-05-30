import * as express from 'express';
import {RoleController} from "../controller/role.controller";
import {checkUserRoles, checkUserToken} from "../middleware";
import {RoleEnum} from "../entity";

const router = express.Router();


router.get('/roles', checkUserToken(), RoleController.fetchAllRoles.bind(this));

router.get('/roles/:role_id', checkUserToken(), RoleController.fetchRoleByRoleId.bind(this));

router.delete('/roles', checkUserToken(), checkUserRoles([RoleEnum.ADMIN]), RoleController.delete.bind(this));

module.exports = router;