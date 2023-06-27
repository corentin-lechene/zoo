import { Request, Response } from "express";
import {SpaceService, SpeciesService} from "../service";
import { ResponseUtil } from "../util";
import { Species } from "../entity";
import { validate } from "class-validator";

export class SpeciesController {
    public static async fetchAllSpecies(req: Request, res: Response): Promise<void> {
        const species = await SpeciesService.fetchAll();
        res.json(species);
    }

    public static async fetchSpeciesById(req: Request, res: Response): Promise<void> {
        const speciesId = req.params["speciesId"] as unknown as number;
        if (!speciesId || speciesId < 0) {
            return ResponseUtil.badRequest(res);
        }

        const species = await SpeciesService.fetchById(speciesId);
        if (!species) {
            return ResponseUtil.notFound(res);
        }

        res.json(species);
    }

    public static async createSpecies(req: Request, res: Response): Promise<void> {
        const { name, origin } = req.body as { name: string; origin: string };

        if (!name || !origin) {
            return ResponseUtil.missingAttribute(res);
        }

        const specie = await SpeciesService.fetchByNameAndOrigin(req.body['name'], req.body['origin']);
        if(specie){
            return ResponseUtil.alreadyExist(res);
        }

        const species = new Species();
        species.name = name;
        species.origin = origin;

        const errors = await validate(species);
        if (errors.length > 0) {
            return ResponseUtil.badRequest(res, errors.toString());
        }

        const createdSpecies = await SpeciesService.create(species);
        if (!createdSpecies) {
            return ResponseUtil.serverError(res);
        }

        res.status(201).json(createdSpecies);
    }

    public static async updateSpecies(req: Request, res: Response): Promise<void> {
        const speciesId = req.params["speciesId"] as unknown as number;
        const { name, origin } = req.body as { name: string; origin: string };

        if (!name || !origin) {
            return ResponseUtil.missingAttribute(res);
        }

        const species = await SpeciesService.fetchById(speciesId);
        if (!species) {
            return ResponseUtil.notFound(res);
        }

        species.name = name;
        species.origin = origin;

        const errors = await validate(species);
        if (errors.length > 0) {
            return ResponseUtil.badRequest(res, errors.toString());
        }

        await SpeciesService.update(species);
        ResponseUtil.ok(res);
    }

    public static async deleteSpecies(req: Request, res: Response): Promise<void> {
        const speciesId = req.params["speciesId"] as unknown as number;

        const species = await SpeciesService.fetchById(speciesId);
        if (!species) {
            return ResponseUtil.notFound(res);
        }

        await SpeciesService.delete(speciesId);
        ResponseUtil.ok(res);
    }
}
