import * as express from 'express';
import { TrackingBookController } from "../controller/trackingBook.controller";
import { checkTrackingBookBody } from "../middleware/trackingBook.middleware";
import {checkUserRoles, checkUserToken} from "../middleware";
import {RoleEnum} from "../entity";

const router = express.Router();

router.get('/trackingBook', TrackingBookController.fetchAllTrackingBooks.bind(this));

router.get('/trackingBook/:trackingBookId', TrackingBookController.fetchTrackingBookById.bind(this));

router.post('/trackingBook', express.json(), checkUserToken(), checkUserRoles([RoleEnum.VETERINARIAN]), checkTrackingBookBody(),
    TrackingBookController.createTrackingBook.bind(this)
);

router.put('/trackingBook/:trackingBookId', express.json(), checkUserToken(), checkUserRoles([RoleEnum.VETERINARIAN]), checkTrackingBookBody(),
    TrackingBookController.updateTrackingBook.bind(this)
);

router.delete('/trackingBook/:trackingBookId', checkUserToken(), checkUserRoles([RoleEnum.ADMIN]), TrackingBookController.deleteTrackingBook.bind(this)
);

module.exports = router;
