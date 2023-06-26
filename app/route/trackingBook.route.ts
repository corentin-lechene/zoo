import * as express from 'express';
import { TrackingBookController } from "../controller/trackingBook.controller";
import { checkTrackingBookBody } from "../middleware/trackingBook.middleware";
import { checkUserRoles} from "../middleware";
import {RoleEnum} from "../entity";

const router = express.Router();

router.get('/trackingBook', TrackingBookController.fetchAllTrackingBooks.bind(this));

router.get('/trackingBook/:trackingBookId', TrackingBookController.fetchTrackingBookById.bind(this));

router.get('/trackingBook/animal/:animalId', TrackingBookController.fetchTrackingBooksByAnimalId.bind(this));

router.post('/trackingBook', express.json(),checkTrackingBookBody(),
    TrackingBookController.createTrackingBook.bind(this)
);

router.put('/trackingBook/:trackingBookId', express.json(), checkUserRoles([RoleEnum.VETERINARIAN]), checkTrackingBookBody(),
    TrackingBookController.updateTrackingBook.bind(this)
);

router.delete('/trackingBook/:trackingBookId', checkUserRoles([RoleEnum.ADMIN]), TrackingBookController.deleteTrackingBook.bind(this)
);

module.exports = router;
