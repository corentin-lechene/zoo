import { Request, Response } from "express";
import { ResponseUtil } from "../util";
import {AnimalService, SpeciesService} from "../service";
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
        const { name, birthDate, deathDate, species, space } = req.body as {
            name: string;
            birthDate: Date;
            deathDate?: Date;
            species: Species[];
            space: Space;
        };

        if (!name || !birthDate || !species || !space) {
            return ResponseUtil.missingAttribute(res);
        }

        const animal = new Animal();
        animal.name = name;
        animal.birthDate = birthDate;
        animal.deathDate = deathDate;
        animal.space = space;

        const errors = await validate(animal);
        if (errors.length > 0) {
            return ResponseUtil.badRequest(res, errors.toString());
        }

        const createdSpecies: Species[] = [];

        //Add species
        for (let i = 0; i < species.length; i++) {
            const newSpecies = new Species();
            newSpecies.name = species[i].name;
            newSpecies.origin = species[i].origin;
            const errorsSpecies = await validate(newSpecies);
            if (errorsSpecies.length > 0) {
                return ResponseUtil.badRequest(res, errorsSpecies.toString());
            }
            const savedSpecies = await SpeciesService.create(newSpecies);
            if (savedSpecies instanceof Species) {
                createdSpecies.push(savedSpecies);
            }
        }

        animal.species = createdSpecies;

        const createdAnimal = await AnimalService.create(animal);
        if (!createdAnimal) {
            return ResponseUtil.serverError(res);
        }

        res.status(201).json(createdAnimal);
    }


    public static async updateAnimal(req: Request, res: Response): Promise<void> {
        const animalId = req.params["animalId"] as unknown as number;
        const { name, birthDate, deathDate, species, space } = req.body as {
            name: string;
            birthDate: Date;
            deathDate?: Date;
            species: Species[];
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

        const createdSpecies: Species[] = [];

        //Update species
        for (let i = 0; i < species.length; i++) {
            const newSpecies = new Species();
            newSpecies.name = species[i].name;
            newSpecies.origin = species[i].origin;
            const errorsSpecies = await validate(newSpecies);
            if (errorsSpecies.length > 0) {
                return ResponseUtil.badRequest(res, errorsSpecies.toString());
            }
            const savedSpecies = await SpeciesService.create(newSpecies);
            if (savedSpecies instanceof Species) {
                createdSpecies.push(savedSpecies);
            }
        }

        animal.species = createdSpecies;

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
