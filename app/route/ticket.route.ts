import * as express from 'express';
import {TicketController} from "../controller/ticket.controller";
import {checkUserRoles, checkUserToken} from "../middleware";
import {RoleEnum} from "../entity";
import {isZooOpened} from "../middleware/zoo.middleware";

const router = express.Router();

router.get('/tickets/', checkUserToken(), TicketController.fetchAllTickets.bind(this));

router.get('/tickets/:ticket_id', checkUserToken(), TicketController.fetchTicket.bind(this));

router.get('/zoo/actualVisitors', TicketController.fetchVisitorsNumber.bind(this));

router.post('/tickets', express.json(), checkUserToken(), TicketController.createTicket.bind(this));

router.post('/tickets/:ticket_id/activate', checkUserToken(), isZooOpened(), TicketController.activeTicket.bind(this));

router.put('/tickets/:ticket_id/exit', TicketController.exit.bind(this));

router.delete('/tickets/:ticket_id', checkUserToken(), checkUserRoles([RoleEnum.ADMIN]), TicketController.deleteTicket.bind(this));


module.exports = router;