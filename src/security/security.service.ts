import {Injectable} from "@nestjs/common";

@Injectable()
export class SecurityService {
    private readonly TOKEN_CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    public generateToken(): string {
        let token = '';
        const charsCount = this.TOKEN_CHARS.length;

        for (let i = 0; i < 256; i++) {
            token += this.TOKEN_CHARS.charAt(Math.floor(Math.random() * charsCount));
        }
        return token;
    }
}