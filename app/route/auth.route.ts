import * as express from 'express';
import {AuthController} from "../controller/auth.controller";

const router = express.Router();


router.post('/auth/login', express.json(), AuthController.login.bind(this));

module.exports = router;