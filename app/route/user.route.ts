import * as express from 'express';
import {UserController} from "../controller/user.controller"


const router = express.Router();


router.get('/users', UserController.fetchAllUsers.bind(this));

router.get('/users/:user_id', UserController.fetchUserByUserId.bind(this));

router.post('/users', express.json(), UserController.saveUser.bind(this));

router.put('/users/:user_id/roles/', express.json(), UserController.updateRoles.bind(this));

module.exports = router;