import * as express from 'express';
import {EmployeeController} from "../controller/employee.controller"


const router = express.Router();


router.get('/users', EmployeeController.fetchAllEmployees.bind(this));

router.get('/users/:user_id', EmployeeController.fetchEmployeeByEmployeeId.bind(this));

router.post('/users', express.json(), EmployeeController.saveEmployee.bind(this));

router.put('/users/:user_id/roles/', express.json(), EmployeeController.updateRoles.bind(this));

module.exports = router;