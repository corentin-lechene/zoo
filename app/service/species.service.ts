import {db} from "../config/typeorm.config";
import {Space, Species} from "../entity";

export class SpeciesService {
    public static async fetchAll(): Promise<Species[]> {
        return db.getRepository(Species).find();
    }

    public static async fetchById(species_id: number): Promise<Species|null> {
        return db.getRepository(Species).findOne({
            where: {speciesId: species_id},
        });
    }

    public static async fetchByNameAndOrigin(species_name: string, species_origin: string): Promise<Species|null> {
        return db.getRepository(Species).findOne({
            where: {name: species_name, origin: species_origin},
        });
    }

    public static async create(species: Species): Promise<Species|null> {
        return db.getRepository(Species).save(species);
    }

    public static async update(species: Species): Promise<Species|null> {
        return db.getRepository(Species).save(species);
    }

    public static async delete(species_id: number): Promise<void> {
        await db.getRepository(Species).delete(species_id);
    }
}
