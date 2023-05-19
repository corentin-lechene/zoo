import * as express from 'express';
import {AnimalController} from "../controller/animal.controller";
import {checkAnimalBody} from "../middleware/animal.middleware";

const router = express.Router();

router.get('/animal', AnimalController.fetchAllAnimals.bind(this));

router.get('/animal/:animalId', AnimalController.fetchAnimalById.bind(this));

router.post('/animal', express.json(), checkAnimalBody(),AnimalController.createAnimal.bind(this));

router.put('/animal/:animalId', express.json(), checkAnimalBody(),AnimalController.updateAnimal.bind(this));

router.delete('/animal/:animalId', AnimalController.deleteAnimal.bind(this));

module.exports = router;