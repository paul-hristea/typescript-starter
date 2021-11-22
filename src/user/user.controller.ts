import {Controller, Get} from '@nestjs/common';
import {User} from '@prisma/client';
import {ReqUser} from "../decorator/req_user.decorator";

@Controller('users')
export class UserController {

    @Get('me')
    public async getMyUser(@ReqUser() user: User): Promise<User> {
        return user;
    }
}
