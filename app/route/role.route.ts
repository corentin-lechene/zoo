import * as express from 'express';
import {RoleController} from "../controller/role.controller";

const router = express.Router();


router.get('/roles', RoleController.fetchAllRoles.bind(this));

router.get('/roles/:role_id', RoleController.fetchRoleByRoleId.bind(this));

router.delete('/roles', RoleController.delete.bind(this));

module.exports = router;