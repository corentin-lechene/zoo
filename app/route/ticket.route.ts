import * as express from 'express';
import {TicketController} from "../controller/ticket.controller";

const router = express.Router();


router.get('/tickets/', TicketController.fetchAllTickets.bind(this));

router.get('/tickets/:ticket_id', TicketController.fetchTicket.bind(this));

router.post('/tickets', express.json(), TicketController.createTicket.bind(this));

router.delete('/tickets/:ticket_id', TicketController.deleteTicket.bind(this));


module.exports = router;