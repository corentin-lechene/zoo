import { Request, Response } from "express";
import { ResponseUtil } from "../util";
import {TrackingBookService} from "../service";
import { Animal, TrackingBook } from "../entity";
import { validate } from "class-validator";

export class TrackingBookController {

    public static async fetchAllTrackingBooks(req: Request, res: Response): Promise<void> {
        res.json(await TrackingBookService.fetchAll());
    }

    public static async fetchTrackingBookById(req: Request, res: Response): Promise<void> {
        const trackingBookId = req.params["trackingBookId"] as unknown as number;
        if (!trackingBookId || trackingBookId < 0){
            return ResponseUtil.badRequest(res);
        }

        const trackingBook = await TrackingBookService.fetchById(trackingBookId);
        if(!trackingBook) {
            return ResponseUtil.notFound(res);
        }

        res.json(trackingBook);
    }

    public static async fetchTrackingBooksByAnimalId(req: Request, res: Response): Promise<void> {
        const animalId = req.params["animalId"] as unknown as number;
        if (!animalId || animalId < 0){
            return ResponseUtil.badRequest(res);
        }

        const trackingBooks = await TrackingBookService.fetchByAnimalId(animalId);
        if(trackingBooks.length === 0) {
            return ResponseUtil.notFound(res);
        }

        res.json(trackingBooks);
    }

    public static async createTrackingBook(req: Request, res: Response): Promise<void> {
        const {treatmentDescription, treatmentDate, animal} = req.body as {
            treatmentDescription: string;
            treatmentDate: Date,
            animal: Animal
        };

        if (!treatmentDescription || !treatmentDate || !animal) {
            return ResponseUtil.missingAttribute(res);
        }

        const trackingBook = new TrackingBook();
        trackingBook.treatmentDescription = treatmentDescription;
        trackingBook.treatmentDate = treatmentDate;
        trackingBook.animal = animal;

        const errors = await validate(trackingBook);
        if (errors.length > 0) {
            return ResponseUtil.badRequest(res, errors.toString());
        }

        const createdTrackingBook = await TrackingBookService.create(trackingBook);
        if (!createdTrackingBook) {
            return ResponseUtil.serverError(res);
        }

        res.status(201).json(createdTrackingBook);
    }

    public static async updateTrackingBook(req: Request, res: Response): Promise<void> {
        const trackingBookId = req.params["trackingBookId"] as unknown as number;
        const {treatmentDescription, treatmentDate, animal} = req.body as {
            treatmentDescription: string;
            treatmentDate: Date,
            animal: Animal
        };

        if (!treatmentDescription || !treatmentDate || !animal) {
            return ResponseUtil.missingAttribute(res);
        }

        const trackingBook = await TrackingBookService.fetchById(trackingBookId);
        if (!trackingBook) {
            return ResponseUtil.notFound(res);
        }

        trackingBook.treatmentDescription = treatmentDescription;
        trackingBook.treatmentDate = treatmentDate;
        trackingBook.animal = animal;

        const errors = await validate(trackingBook);
        if (errors.length > 0) {
            return ResponseUtil.badRequest(res, errors.toString());
        }

        await TrackingBookService.update(trackingBook);
        ResponseUtil.ok(res);
    }

    public static async deleteTrackingBook(req: Request, res: Response): Promise<void> {
        const trackingBookId = req.params["trackingBookId"] as unknown as number;

        const trackingBook = await TrackingBookService.fetchById(trackingBookId);
        if (!trackingBook) {
            return ResponseUtil.notFound(res);
        }

        await TrackingBookService.deleteById(trackingBookId);
        ResponseUtil.ok(res);
    }

}
