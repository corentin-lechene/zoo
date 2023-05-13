import {db} from "../config/typeorm.config";
import {FindOptionsWhere, UpdateResult} from "typeorm";
import {Course} from "../entity";

export class CourseService {
    public static async fetchAll(): Promise<Course[]> {
        return db.getRepository(Course).find({
            relations: {spaces: true}
        });
    }

    public static async fetchById(course_id: number): Promise<Course|null> {
        if(!course_id) {
            return null;
        }
        return db.getRepository(Course).findOne({
            where: {id: course_id},
            relations: {spaces: true}
        });
    }

    public static async fetchByCoursesId(courses_id: number[]): Promise<Course[]> {
        const buildWhere: FindOptionsWhere<Course>[] = courses_id.map((id) => ({id: id}));
        return db.getRepository(Course).find({
            where: buildWhere,
            relations: {spaces: true}
        });
    }

    public static async create(course: Course): Promise<Course> {
        return db.getRepository(Course).save(course);
    }

    public static async update(course: Course): Promise<Course> {
        return db.getRepository(Course).save(course);
    }

    static async delete(course: Course): Promise<UpdateResult> {
        return db.getRepository(Course).softDelete({id: course.id})
    }
}