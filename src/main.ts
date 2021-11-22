import {NestFactory} from '@nestjs/core';
import {AppModule} from './app/app.module';
import {PrismaService} from "./prisma/prisma.service";
import {AuthGuard} from "./guard/auth.guard";
import {AuthModule} from "./auth/auth.module";
import {AuthService} from "./auth/auth.service";
import {UserModule} from "./user/user.module";
import {UserService} from "./user/user.service";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const authService = app
        .select(AuthModule)
        .get(AuthService);
    const userService = app
        .select(UserModule)
        .get(UserService);
    app.useGlobalGuards(
        new AuthGuard(authService, userService)
    );
    const prismaService = app.get(PrismaService);
    await prismaService.enableShutdownHooks(app);
    await app.listen(3001);
}

bootstrap();
