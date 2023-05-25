import * as express from 'express';
import {MaintenanceController} from "../controller/maintenance.controller";
import {checkBody, checkIfMaintenanceExist} from '../middleware/maintenance.middleware'

const router = express.Router();

router.get('/maintenances', MaintenanceController.fetchAllMaintenances.bind(this));

router.get('/maintenances/:maintenance_id', checkIfMaintenanceExist(), MaintenanceController.fetchMaintenanceById.bind(this));

router.post('/maintenances', express.json(), checkBody(), MaintenanceController.createMaintenance.bind(this));

router.put('/maintenances/:maintenance_id', express.json(), checkBody(), checkIfMaintenanceExist(), MaintenanceController.updateMaintenance.bind(this));

router.delete('/maintenances/:maintenance_id', checkIfMaintenanceExist(), MaintenanceController.deleteMaintenance.bind(this));

module.exports = router;