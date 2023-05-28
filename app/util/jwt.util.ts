import {config} from "dotenv";
import {JwtPayload} from "jsonwebtoken";

config();

const jwt = require('jsonwebtoken');

export interface TokenData extends JwtPayload {
    id: number;
}

export default class JwtUtil {
    private static readonly secret = process.env.JWT_SCRET_KEY;
    public static readonly expirationTime = "7 days";

    public static generateToken(data: TokenData, expiresIn: string): string {
        return jwt.sign(data, this.secret, {expiresIn});
    }

    public static decodeToken(token: string): TokenData | null {
        try {
            const decoded = jwt.verify(token, this.secret);
            return decoded as TokenData;
        } catch (error) {
            return null;
        }
    }

    public static isTokenValid(token: string): boolean {
        return this.decodeToken(token) !== null;
    }

    public static getTokenExpirationDate(token: string): Date | null {
        const decoded = this.decodeToken(token);
        if (decoded && decoded.exp) {
            return new Date(decoded.exp * 1000);
        }
        return null;
    }

    public static isTokenExpired(token: string): boolean {
        const expirationDate = this.getTokenExpirationDate(token);
        if (expirationDate) {
            return expirationDate < new Date();
        }
        return true;
    }
}