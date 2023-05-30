import * as express from 'express';
import {SpeciesController} from "../controller/species.controller";
import {checkSpeciesBody} from "../middleware/species.middleware";
import {checkUserRoles, checkUserToken} from "../middleware";
import {RoleEnum} from "../entity";

const router = express.Router();

router.get('/species', SpeciesController.fetchAllSpecies.bind(this));

router.get('/species/:speciesId', SpeciesController.fetchSpeciesById.bind(this));

router.post('/species', express.json(), checkUserToken(), checkSpeciesBody(),SpeciesController.createSpecies.bind(this));

router.put('/species/:speciesId', express.json(), checkUserToken(), checkSpeciesBody(),SpeciesController.updateSpecies.bind(this));

router.delete('/species/:speciesId', checkUserRoles([RoleEnum.ADMIN]), SpeciesController.deleteSpecies.bind(this));

module.exports = router;