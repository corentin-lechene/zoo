import * as express from 'express';
import {SpaceController} from "../controller/space.controller";
import {checkBody} from "../middleware/space.middleware";

const router = express.Router();


router.get('/spaces/', SpaceController.fetchAllSpaces.bind(this));

router.get('/spaces/:space_id', SpaceController.fetchSpaceById.bind(this));

router.post('/spaces', express.json(), checkBody(), SpaceController.createSpace.bind(this));

router.put('/spaces/:space_id', express.json(), checkBody(), SpaceController.updateSpace.bind(this));

router.delete('/spaces/:space_id', SpaceController.deleteSpace.bind(this));


module.exports = router;