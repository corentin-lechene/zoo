import { Request, Response } from "express";
import { ResponseUtil } from "../util";
import {AnimalService, SpaceService, SpeciesService} from "../service";
import {Animal, Space, Species} from "../entity";
import { validate } from "class-validator";

export class AnimalController {
    public static async fetchAllAnimals(req: Request, res: Response): Promise<void> {
        const animals = await AnimalService.fetchAll();
        res.json(animals);
    }

    public static async fetchAnimalById(req: Request, res: Response): Promise<void> {
        const animalId = req.params["animalId"] as unknown as number;
        if (!animalId || animalId < 0) {
            return ResponseUtil.badRequest(res);
        }

        const animal = await AnimalService.fetchById(animalId);
        if (!animal) {
            return ResponseUtil.notFound(res);
        }

        res.json(animal);
    }

    public static async createAnimal(req: Request, res: Response): Promise<void> {
        const { name, birthDate, specieId, spaceId } = req.body as {
            name: string;
            birthDate: Date;
            specieId: number;
            spaceId: number;
        };

        if (!name || !birthDate || !specieId || !spaceId) {
            return ResponseUtil.missingAttribute(res);
        }

        // Fetch space
        const space = await SpaceService.fetchById(spaceId);
        if(!space) { return ResponseUtil.notFound(res); }

        const specie = await SpeciesService.fetchById(specieId);
        if(!specie) { return ResponseUtil.notFound(res); }

        const animal = new Animal();
        animal.name = name;
        animal.birthDate = birthDate;
        animal.space = space;
        animal.specie = specie;

        const errors = await validate(animal);
        if (errors.length > 0) {
            return ResponseUtil.badRequest(res, errors.toString());
        }

        try {
            const createdAnimal = await AnimalService.create(animal);
            if (!createdAnimal) {
                return ResponseUtil.serverError(res);
            }
            res.status(201).json(createdAnimal);
        } catch (e) {
            console.error(e);
            ResponseUtil.serverError(res);
        }

    }


    public static async updateAnimal(req: Request, res: Response): Promise<void> {
        const animalId = req.params["animalId"] as unknown as number;
        const { name, birthDate, deathDate, species, space } = req.body as {
            name: string;
            birthDate: Date;
            deathDate?: Date;
            species: Species;
            space: Space;
        };

        if (!name || !birthDate || !species || !space) {
            return ResponseUtil.missingAttribute(res);
        }

        const animal = await AnimalService.fetchById(animalId);
        if (!animal) {
            return ResponseUtil.notFound(res);
        }

        animal.name = name;
        animal.birthDate = birthDate;
        animal.deathDate = deathDate;
        animal.space = space;

        const errors = await validate(animal);
        if (errors.length > 0) {
            return ResponseUtil.badRequest(res, errors.toString());
        }

        await AnimalService.update(animal);
        ResponseUtil.ok(res);
    }

    public static async deleteAnimal(req: Request, res: Response): Promise<void> {
        const animalId = req.params["animalId"] as unknown as number;

        const animal = await AnimalService.fetchById(animalId);
        if (!animal) {
            return ResponseUtil.notFound(res);
        }

        await AnimalService.delete(animalId);
        ResponseUtil.ok(res);
    }
}
