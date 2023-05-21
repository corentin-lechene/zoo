import { Request, Response } from "express";
import { EmployeeService } from "../service";
import { ResponseUtil } from "../util";
import JwtUtil from "../util/jwt.util";

export class AuthController {
    public static async login(req: Request, res: Response): Promise<void> {
        const identifier = req.body['email'] as unknown as string;
        const password = req.body['password'] as unknown as string;

        if (!identifier || !password) {
            return ResponseUtil.missingAttribute(res);
        }

        const user = await EmployeeService.fetchByIdentifier(identifier, password);
        if (!user) {
            return ResponseUtil.notFound(res);
        }

        user.token = JwtUtil.generateToken(user.toTokenData(), JwtUtil.expirationTime);
        await EmployeeService.update(user);
        res.json({ token: user.token });
    }
}