import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private userService: UserService,
        private jwtService: JwtService
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
        const user = req.user;
        const payload = { email: user.email, sub: user.id };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
