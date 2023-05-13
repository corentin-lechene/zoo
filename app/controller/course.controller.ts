import {Request, Response} from "express";
import {CourseService} from "../service";
import {ResponseUtil} from "../util";
import {Course} from "../entity";

export class CourseController {
    public static async fetchAllCourses(req: Request, res: Response): Promise<void> {
        res.json(await CourseService.fetchAll());
    }

    public static async fetchCourse(req: Request, res: Response): Promise<void> {
        const courseId = req.params['course_id'] as unknown as number;
        if(!courseId) {
            return ResponseUtil.missingAttribute(res);
        }

        const course = await CourseService.fetchById(courseId);
        if(!course) {
            return ResponseUtil.notFound(res);
        }

        res.status(200).json(course);
    }

    public static async createCourse(req: Request, res: Response): Promise<void> {
        const spacesId = req.body['spaces'] as unknown as number[];
        if(spacesId.length === 0) {
            return ResponseUtil.missingAttribute(res);
        }

        //todo
        //const courses = await SpaceService.fetchBySpacesId(spacesId);
        //const newCourse = new Course();
        //newCourse.spaces = courses;
        // await CourseService.create(newCourse);
        ResponseUtil.created(res);
    }

    public static async deleteCourse(req: Request, res: Response): Promise<void> {
        const courseId = req.params['course_id'] as unknown as number;
        if(!courseId) {
            return ResponseUtil.missingAttribute(res);
        }

        const course = await CourseService.fetchById(courseId);
        if(!course) {
            return ResponseUtil.notFound(res);
        }

        await CourseService.delete(course);
        ResponseUtil.ok(res);
    }
}