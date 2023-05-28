import * as express from 'express';
import {TicketController} from "../controller/ticket.controller";
import {checkUserRoles, checkUserToken} from "../middleware";
import {RoleEnum} from "../entity";

const router = express.Router();


router.get('/tickets/', TicketController.fetchAllTickets.bind(this));

router.get('/tickets/:ticket_id', TicketController.fetchTicket.bind(this));

router.post('/tickets', express.json(), checkUserToken(), TicketController.createTicket.bind(this));

router.post('/tickets/:ticket_id/activate', checkUserToken(), TicketController.activeTicket.bind(this));

router.delete('/tickets/:ticket_id', checkUserRoles([RoleEnum.ADMIN]), TicketController.deleteTicket.bind(this));


module.exports = router;