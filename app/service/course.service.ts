import {db} from "../config/typeorm.config";
import {Course} from "../entity";

export class CourseService {
    public static async fetchAll(): Promise<Course[]> {
        return db.getRepository(Course).find({
            relations: {spaces: true}
        });
    }

    public static async fetchById(course_id: number): Promise<Course|null> {
        return db.getRepository(Course).findOne({
            where: {id: course_id},
            relations: {spaces: true}
        });
    }

    public static async create(course: Course): Promise<Course> {
        return db.getRepository(Course).save(course);
    }

    public static async update(course: Course): Promise<Course> {
        return db.getRepository(Course).save(course);
    }
}