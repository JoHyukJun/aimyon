import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { V4 } from 'paseto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private userService: UserService
    ) {}

    async validateUser(email: string, pass: string) {
        const user = await this.userService.getUserByEmail(email);

        if (user && user.password === pass) {
            const { password, ...result } = user;

            return result;
        }

        return null;
    }

    async signIn(req) {
        return '';
    }
}
