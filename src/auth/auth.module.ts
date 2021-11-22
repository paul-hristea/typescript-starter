import {Module} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {AuthController} from "./auth.controller";
import {SecurityModule} from "../security/security.module";
import {PrismaModule} from "../prisma/prisma.module";
import {UserModule} from "../user/user.module";

@Module({
    imports: [SecurityModule, PrismaModule, UserModule],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {
}
