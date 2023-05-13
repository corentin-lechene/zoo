import * as express from 'express';
import {VisitorController} from "../controller/visitor.controller";

const router = express.Router();


router.get('/visitors/', VisitorController.fetchAllVisitors.bind(this));

router.get('/visitors/:visitor_id', VisitorController.fetchVisitor.bind(this));

router.post('/visitors', express.json(), VisitorController.createVisitor.bind(this));

router.delete('/visitors/:visitor_id', VisitorController.deleteVisitor.bind(this));


module.exports = router;