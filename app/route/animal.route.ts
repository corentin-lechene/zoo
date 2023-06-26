import * as express from 'express';
import {AnimalController} from "../controller/animal.controller";
import {checkAnimalBody} from "../middleware/animal.middleware";
import {checkUserToken} from "../middleware";
import {isZooOpened} from "../middleware/zoo.middleware";

const router = express.Router();

router.get('/animal', isZooOpened(), AnimalController.fetchAllAnimals.bind(this));

router.get('/animal/:animalId', AnimalController.fetchAnimalById.bind(this));

router.post('/animal', express.json(), checkUserToken(), checkAnimalBody(),AnimalController.createAnimal.bind(this));

router.put('/animal/:animalId', express.json(), checkUserToken(), checkAnimalBody(),AnimalController.updateAnimal.bind(this));

router.delete('/animal/:animalId', checkUserToken(), AnimalController.deleteAnimal.bind(this));

module.exports = router;