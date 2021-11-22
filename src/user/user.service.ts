import {Injectable} from "@nestjs/common";
import {User} from "@prisma/client";
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) {
    }

    public async getUserById(id: number): Promise<User> {
        return this.prisma.user.findUnique({
            where: {id: Number(id)}
        });
    }

    public async getUserByEmail(email: string): Promise<User> {
        return this.prisma.user.findUnique({
            where: {email: String(email)}
        });
    }

}