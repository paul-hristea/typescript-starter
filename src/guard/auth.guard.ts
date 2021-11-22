import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {AuthService} from "../auth/auth.service";
import {UserService} from "../user/user.service";
import {Reflector} from "@nestjs/core";
import {PUBLIC_KEY} from "../decorator/public.decorator";

@Injectable()
export class AuthGuard implements CanActivate {

    private readonly reflector: Reflector;

    constructor(private readonly authService: AuthService,
                private readonly userService: UserService) {
        this.reflector = new Reflector();
    }

    async canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.get<boolean>(PUBLIC_KEY, context.getHandler());

        if (isPublic) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const authorization = request.header('Authorization');

        if (!authorization) {
            throw new UnauthorizedException();
        }
        if (!authorization.startsWith('Bearer ')) {
            throw new UnauthorizedException();
        }
        const token = authorization.substring('Bearer '.length);

        if (!token?.length) {
            throw new UnauthorizedException();
        }
        const session = await this.authService.validateToken(token);
        request.user = await this.userService.getUserById(session.userId);
        return true;
    }
}