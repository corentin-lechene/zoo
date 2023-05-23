import * as express from 'express';
import {SpaceController} from "../controller/space.controller";
import {checkBody, checkBodyManageSpace} from "../middleware/space.middleware";
import {checkUserRoles} from "../middleware";
import {RoleEnum} from "../entity";

const router = express.Router();

router.get('/spaces', SpaceController.fetchAllSpaces.bind(this));

router.get('/spaces/:space_id', SpaceController.fetchSpaceById.bind(this));

router.get('/spaces/:space_id/actualVisitors', SpaceController.fetchVisitorsNumber.bind(this));

router.get('/spaces/:space_id/bestMonthToMaintain', SpaceController.fetchBestMonthToMaintain.bind(this));

router.post('/spaces', express.json(), checkBody(), SpaceController.createSpace.bind(this));

router.post('/spaces/:space_id/enter', express.json(), checkBodyManageSpace(), SpaceController.enterSpace.bind(this));

router.put('/spaces/:space_id', express.json(), checkBody(), SpaceController.updateSpace.bind(this));

router.put('/spaces/underMaintenance/:space_id', express.json(), checkUserRoles([RoleEnum.ADMIN]), SpaceController.underMaintenanceSpace.bind(this));

router.delete('/spaces/:space_id', SpaceController.deleteSpace.bind(this));

router.delete('/spaces/:space_id/exit', express.json(), checkBodyManageSpace(), SpaceController.exitSpace.bind(this));

module.exports = router;