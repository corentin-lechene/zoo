import * as express from 'express';
import {VisitorController} from "../controller/visitor.controller";
import {checkUserToken} from "../middleware";

const router = express.Router();


router.get('/visitors/', checkUserToken(), VisitorController.fetchAllVisitors.bind(this));

router.get('/visitors/:visitor_id', checkUserToken(), VisitorController.fetchVisitor.bind(this));

router.post('/visitors', express.json(), VisitorController.createVisitor.bind(this));

router.delete('/visitors/:visitor_id', checkUserToken(), VisitorController.deleteVisitor.bind(this));


module.exports = router;