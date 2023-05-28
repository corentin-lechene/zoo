import * as express from 'express';
import {MaintenanceController} from "../controller/maintenance.controller";
import {checkBody} from '../middleware/maintenance.middleware'
import {checkUserRoles, checkUserToken} from "../middleware";
import {RoleEnum} from "../entity";

const router = express.Router();

router.get('/maintenances', MaintenanceController.fetchAllMaintenances.bind(this));

router.get('/maintenances/:maintenance_id', MaintenanceController.fetchMaintenanceById.bind(this));

router.post('/maintenances', express.json(), checkUserToken(), checkUserRoles([RoleEnum.ADMIN]), checkBody(), MaintenanceController.createMaintenance.bind(this));

router.put('/maintenances/:maintenance_id', express.json(), checkUserToken(), checkUserRoles([RoleEnum.ADMIN]), checkBody(), MaintenanceController.updateMaintenance.bind(this));

router.delete('/maintenances/:maintenance_id', checkUserToken(), checkUserRoles([RoleEnum.ADMIN]), MaintenanceController.deleteMaintenance.bind(this));

//TODO : faire une route pour savoir le meilleur moment de maintenir un espace

module.exports = router;