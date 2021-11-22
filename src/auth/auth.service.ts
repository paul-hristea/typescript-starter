import {ConflictException, Injectable, UnauthorizedException} from "@nestjs/common";
import {Session, User} from "@prisma/client";
import {PrismaService} from "../prisma/prisma.service";
import {RegisterRequest} from "../request/register.request";
import {UserService} from "../user/user.service";
import {SecurityService} from "../security/security.service";

@Injectable()
export class AuthService {

    constructor(private readonly prisma: PrismaService,
                private readonly userService: UserService,
                private readonly securityService: SecurityService) {
    }

    public async authorizeLogin(email: string, password: string): Promise<User> {
        const user = await this.userService.getUserByEmail(email);

        if (!user) {
            throw new UnauthorizedException();
        }
        if (user.password != password) { // TODO salt&hash
            throw new UnauthorizedException();
        }
        return user;
    }

    public async register(request: RegisterRequest): Promise<Session> {
        let user = await this.userService.getUserByEmail(request.email);

        if (user) {
            throw new ConflictException('Email already exists');
        }
        user = await this.prisma.user.create({
            data: {
                email: request.email,
                password: request.password // TODO: salt&hash
            }
        });
        return this.generateSession(user);
    }

    public async generateSession(user: User): Promise<Session> {
        return this.prisma.session.create({
            data: {
                userId: user.id,
                token: this.securityService.generateToken()
            }
        });
    }

    public async validateToken(token: string): Promise<Session> {
        const session = this.prisma.session.findFirst({
            where: {token: String(token)}
        })
        if (!session) {
            throw new UnauthorizedException();
        }
        return session;
    }
}