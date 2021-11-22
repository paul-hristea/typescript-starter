import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(private readonly authService: AuthService) {
    }

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const authorization = request.header('Authorization');

        if (!authorization) {
            throw new UnauthorizedException();
        }
        const basicPrefix = 'Basic ';

        if (!authorization.startsWith(basicPrefix)) {
            throw new UnauthorizedException();
        }
        const credentials = authorization.substring(basicPrefix.length);

        if (!credentials.includes(':')) {
            throw new UnauthorizedException();
        }
        const separatorIndex = credentials.indexOf(':');
        const email = credentials.substring(0, separatorIndex);
        const password = credentials.substring(separatorIndex + 1);
        request.user = await this.authService.authorizeLogin(email, password);
        return true;
    }
}