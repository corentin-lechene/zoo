import * as express from 'express';
import {AuthController} from "../controller/auth.controller";
import {checkUserRoles, checkUserToken} from "../middleware";
import {RoleEnum} from "../entity";

const router = express.Router();


router.post('/auth/login', express.json(), AuthController.login.bind(this));

module.exports = router;