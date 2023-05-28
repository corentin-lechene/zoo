import * as express from 'express';
import {SpaceController} from "../controller/space.controller";
import {checkBody} from "../middleware/space.middleware";
import {checkUserRoles, checkUserToken} from "../middleware";
import {RoleEnum} from "../entity";

const router = express.Router();

router.get('/spaces', SpaceController.fetchAllSpaces.bind(this));

router.get('/spaces/:space_id', SpaceController.fetchSpaceById.bind(this));

router.post('/spaces', express.json(), checkUserToken(), checkBody(), SpaceController.createSpace.bind(this));

router.put('/spaces/:space_id', express.json(), checkUserToken(), checkBody(), SpaceController.updateSpace.bind(this));

router.put('/spaces/:space_id/status', checkUserToken(), checkUserRoles([RoleEnum.ADMIN]), express.json(), SpaceController.updateStatus.bind(this));

//TODO : middleware to check role "admin"
router.put('/spaces/underMaintenance/:space_id', express.json(), checkUserRoles([RoleEnum.ADMIN]), SpaceController.underMaintenanceSpace.bind(this));

router.get("/spaces/:space_id/validateAccess", checkUserToken(), SpaceController.validateUserAccess.bind(this));

router.delete('/spaces/:space_id',  checkUserRoles([RoleEnum.ADMIN]), SpaceController.deleteSpace.bind(this));

module.exports = router;