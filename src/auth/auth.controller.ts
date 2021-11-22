import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {Session, User} from '@prisma/client';
import {LoginGuard} from "../guard/login.guard";
import {ReqUser} from "../decorator/req_user.decorator";
import {RegisterRequest} from "../request/register.request";
import {Public} from "../decorator/public.decorator";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Public()
    @Post('register')
    public async register(@Body() request: RegisterRequest): Promise<Session> {
        return this.authService.register(request);
    }

    @Public()
    @UseGuards(LoginGuard)
    @Post('login')
    public async login(@ReqUser() user: User): Promise<Session> {
        return this.authService.generateSession(user);
    }
}
