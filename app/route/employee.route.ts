import * as express from 'express';
import {EmployeeController} from "../controller/employee.controller"
import {checkUserRoles, checkUserToken} from "../middleware";
import {RoleEnum} from "../entity";


const router = express.Router();


router.get('/employees', checkUserToken(), EmployeeController.fetchAllEmployees.bind(this));

router.get('/employees/works', checkUserToken(), EmployeeController.fetchEmployeeWhoWorks.bind(this));

router.get('/employees/:employee_id', checkUserToken(), EmployeeController.fetchEmployeeByEmployeeId.bind(this));

router.post('/employees', checkUserToken(), checkUserRoles([RoleEnum.ADMIN]), express.json(), EmployeeController.saveEmployee.bind(this));

router.put('/employees/:employee_id/roles/', checkUserToken(), express.json(), EmployeeController.updateRoles.bind(this));

router.patch('/employees/:employee_id/status', checkUserToken(), express.json(), EmployeeController.updateStatus.bind(this));

module.exports = router;