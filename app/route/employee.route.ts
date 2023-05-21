import * as express from 'express';
import {EmployeeController} from "../controller/employee.controller"
import {checkUserRoles, checkUserToken} from "../middleware";
import {RoleEnum} from "../entity";


const router = express.Router();


router.get('/employees', EmployeeController.fetchAllEmployees.bind(this));

router.get('/employees/:employee_id', EmployeeController.fetchEmployeeByEmployeeId.bind(this));

router.post('/employees', checkUserToken(), checkUserRoles([RoleEnum.ADMIN]), express.json(), EmployeeController.saveEmployee.bind(this));

router.put('/employees/:employee_id/roles/', express.json(), EmployeeController.updateRoles.bind(this));

router.patch('/employees/:employee_id/status', checkUserToken(), express.json(), EmployeeController.updateStatus.bind(this));

module.exports = router;