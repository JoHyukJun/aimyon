import { HttpException, Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    private async verifyPassword(password: string, hashedPassword: string) {
        const isValidPassword = await bcrypt.compair(password, hashedPassword);

        if (!isValidPassword) {
            throw new BadRequestException();
        }
    }

    async validateUser(email: string, pass: string) {
        try {
            const user = await this.userService.getUserByEmail(email);
            const isValidUser = await this.verifyPassword(pass, user.password);

            const { password, ...result } = user;

            return result;

        }
        catch(e) {
            throw new UnauthorizedException();
        }
    }

    async signIn(req) {
        const user = req.user;
        const payload = { email: user.email, sub: user.id };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async logOut() {
        const response = `Authentication=; HttpOnly; Path=/; Max-Age=0`;
    }
}
