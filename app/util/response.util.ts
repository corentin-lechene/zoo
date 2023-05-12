import {Response} from "express";

export class ResponseUtil {
    public static readonly MISSING_ATTRIBUTE  = "Missing Attribute";
    public static readonly UNAUTHORIZED  = "Unauthorized";
    public static readonly FORBIDDEN  = "Forbidden";
    public static readonly NOT_FOUND  = "Not Found";
    public static readonly SOMETHING_WENT_WRONG = "Something Went Wrong";

    public static ok(res: Response, message?: string): void {
        res.status(200).send(message);
    }

    public static missingAttribute(res: Response): void {
        res.status(400).send(this.MISSING_ATTRIBUTE);
    }

    public static unauthorized (res: Response): void {
        res.status(401).send(this.UNAUTHORIZED);
    }

    public static forbidden(res: Response): void {
        res.status(403).send(this.FORBIDDEN);
    }

    public static notFound(res: Response): void {
        res.status(404).send(this.NOT_FOUND);
    }

    static somethingWentWrong(res: Response): void {
        res.status(400).send(this.SOMETHING_WENT_WRONG);
    }

    public static created(res: Response, message?: string): void {
        res.status(201).send(message);
    }

    public static noContent(res: Response, message?: string): void {
        res.status(204).send(message);
    }

    public static badRequest(res: Response, message?: string): void {
        res.status(400).send(message);
    }

    public static serverError(res: Response, message?: string): void {
        res.status(500).send(message);
    }
}