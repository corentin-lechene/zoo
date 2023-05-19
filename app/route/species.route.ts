import * as express from 'express';
import {SpeciesController} from "../controller/species.controller";
import {checkSpeciesBody} from "../middleware/species.middleware";

const router = express.Router();

router.get('/species', SpeciesController.fetchAllSpecies.bind(this));

router.get('/species/:speciesId', SpeciesController.fetchSpeciesById.bind(this));

router.post('/species', express.json(), checkSpeciesBody(),SpeciesController.createSpecies.bind(this));

router.put('/species/:speciesId', express.json(), checkSpeciesBody(),SpeciesController.updateSpecies.bind(this));

router.delete('/species/:speciesId', SpeciesController.deleteSpecies.bind(this));

module.exports = router;