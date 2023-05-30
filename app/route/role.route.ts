import * as express from 'express';
import {RoleController} from "../controller/role.controller";
import {checkUserRoles} from "../middleware";
import {RoleEnum} from "../entity";

const router = express.Router();


router.get('/roles', RoleController.fetchAllRoles.bind(this));

router.get('/roles/:role_id', RoleController.fetchRoleByRoleId.bind(this));

router.delete('/roles', checkUserRoles([RoleEnum.ADMIN]), RoleController.delete.bind(this));

module.exports = router;