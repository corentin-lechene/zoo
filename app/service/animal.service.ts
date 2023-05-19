import {db} from "../config/typeorm.config";
import {Animal} from "../entity";

export class AnimalService {
    public static async fetchAll(): Promise<Animal[]> {
        return db.getRepository(Animal).find({
            relations: {
                species: true,
                space: true
            },
        });
    }

    public static async fetchById(animal_id: number): Promise<Animal|null> {
        return db.getRepository(Animal).findOne({
            where: {animalId: animal_id},
            relations: {
                species: true,
                space: true
            },
        });
    }

    public static async create(animal: Animal): Promise<Animal|null> {
        return db.getRepository(Animal).save(animal);
    }

    public static async update(animal: Animal): Promise<Animal|null> {
        return db.getRepository(Animal).save(animal);
    }

    public static async delete(animalId: number): Promise<boolean> {
        const animal = await this.fetchById(animalId);
        if (!animal) {
            return false;
        }
        await db.getRepository(Animal).delete(animalId);
        return true;
    }
}