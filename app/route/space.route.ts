import * as express from 'express';
import {SpaceController} from "../controller/space.controller";
import {checkBody, checkBodyManageSpace, checkIfSpaceExist} from "../middleware/space.middleware";
import {checkUserRoles, checkUserToken} from "../middleware";
import {RoleEnum} from "../entity";

const router = express.Router();

router.get('/spaces', SpaceController.fetchAllSpaces.bind(this));

router.get('/spaces/:space_id', checkIfSpaceExist(), SpaceController.fetchSpaceById.bind(this));

router.get('/spaces/:space_id/actualVisitors', SpaceController.fetchVisitorsNumber.bind(this));

router.get('/spaces/:space_id/bestMonthToMaintain', SpaceController.fetchBestMonthToMaintain.bind(this));

router.post('/spaces', express.json(), checkUserToken(), checkBody(), SpaceController.createSpace.bind(this));

router.put('/spaces/:space_id', express.json(), checkUserToken(), checkBody(), SpaceController.updateSpace.bind(this));

router.post('/spaces/:space_id/enter', express.json(), checkBodyManageSpace(), SpaceController.enterSpace.bind(this));

router.get("/spaces/:space_id/validateAccess/:ticket_id", checkUserToken(), SpaceController.validateUserAccess.bind(this));

router.delete('/spaces/:space_id', checkUserRoles([RoleEnum.ADMIN]), SpaceController.deleteSpace.bind(this));

router.put('/spaces/underMaintenance/:space_id', express.json(), checkUserRoles([RoleEnum.ADMIN]), SpaceController.underMaintenanceSpace.bind(this));

router.delete('/spaces/:space_id', checkIfSpaceExist(), SpaceController.deleteSpace.bind(this));

router.put('/spaces/:space_id/status', checkUserToken(), checkUserRoles([RoleEnum.ADMIN]), express.json(), SpaceController.updateStatus.bind(this));

router.put('/spaces/underMaintenance/:space_id', express.json(), SpaceController.underMaintenanceSpace.bind(this));

router.delete('/spaces/:space_id/exit', express.json(), checkBodyManageSpace(), SpaceController.exitSpace.bind(this));

module.exports = router;