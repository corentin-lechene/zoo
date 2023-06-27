import { db } from '../config/typeorm.config';
import { TrackingBook } from "../entity";

export class TrackingBookService {
    public static async fetchAll(): Promise<TrackingBook[]> {
        return db.getRepository(TrackingBook).find({
            relations: {animal: true}
        });
    }

    public static async fetchById(
        tracking_book_id: number,
    ): Promise<TrackingBook | null> {
        return db.getRepository(TrackingBook).findOne({
            where: { trackingBookId: tracking_book_id },
            relations: {animal: true}
        });
    }

    public static async fetchByAnimalId(animalId: number): Promise<TrackingBook[]> {
        return db.getRepository(TrackingBook)
            .createQueryBuilder("trackingBook")
            .innerJoin("trackingBook.animal", "animal")
            .where("animal.animalId = :animalId", { animalId })
            .getMany();
    }

    public static async create(trackingBook: TrackingBook): Promise<TrackingBook> {
        return db.getRepository(TrackingBook).save(trackingBook);
    }

    public static async update(trackingBook: TrackingBook): Promise<TrackingBook> {
        return db.getRepository(TrackingBook).save(trackingBook);
    }

    public static async deleteById(tracking_book_id: number): Promise<void> {
        await db.getRepository(TrackingBook).delete(tracking_book_id);
    }
}
