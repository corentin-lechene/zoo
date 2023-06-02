import * as express from 'express';
import {MaintenanceController} from "../controller/maintenance.controller";
import {checkBody, checkIfMaintenanceExist} from '../middleware/maintenance.middleware'
import {checkUserRoles, checkUserToken} from "../middleware";
import {RoleEnum} from "../entity";

const router = express.Router();

router.get('/maintenances', MaintenanceController.fetchAllMaintenances.bind(this));

router.get('/maintenances/:maintenance_id', checkIfMaintenanceExist(), MaintenanceController.fetchMaintenanceById.bind(this));

router.post('/maintenances', express.json(), checkUserToken(), checkUserRoles([RoleEnum.ADMIN]), checkBody(), MaintenanceController.createMaintenance.bind(this));

router.delete('/maintenances/:maintenance_id', checkUserToken(), checkUserRoles([RoleEnum.ADMIN]), checkIfMaintenanceExist(), MaintenanceController.deleteMaintenance.bind(this));

router.put('/maintenances/:maintenance_id', express.json(), checkUserToken(), checkUserRoles([RoleEnum.ADMIN]), checkBody(), checkIfMaintenanceExist(), MaintenanceController.updateMaintenance.bind(this));


module.exports = router;