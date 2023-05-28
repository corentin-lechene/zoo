const bcrypt = require('bcrypt');

interface Pwd {
    plaintext: string;
    hashed: Promise<string>;
}

export default class PwdUtil {
    private static readonly saltRounds: number = 10;

    public static async hash(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(this.saltRounds);
        return bcrypt.hash(password, salt);
    }

    public static async compare(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

    public static generateRandomPassword(length: number = 12): Pwd {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
        let password = '';
        for (let i = 0; i < length; i++) {
            password += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return {
            plaintext: password,
            hashed: PwdUtil.hash(password)
        };
    }

    public static validatePasswordStrength(password: string): boolean {
        const strongRegex = new RegExp(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])(?=.{8,})'
        );
        return strongRegex.test(password);
    }
}