import * as express from 'express';
import {CourseController} from "../controller/course.controller";

const router = express.Router();


router.get('/courses/', CourseController.fetchAllCourses.bind(this));

router.get('/courses/:course_id', CourseController.fetchCourse.bind(this));

router.delete('/courses/:course_id', CourseController.deleteCourse.bind(this));


module.exports = router;