import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
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

    async validateUser(email: string, pass: string) {
        const user = await this.userService.getUserByEmail(email);
        
        const saltOrRounds = 10;
        const hasedPassword = await bcrypt.hash(pass, saltOrRounds);
        console.log(hasedPassword);

        if (user && user.password === hasedPassword) {
            const { password, ...result } = user;

            return result;
        }
        else {
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
}
