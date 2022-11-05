import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService
    ) {}

    async getUserAll() {
        return await this.prisma.user.findMany();
    }

    async signUp(body) {
        const response = await this.prisma.user.create({
            data: {
                email: body.email,
                name: body.name,
            },
        });

        return response;
    }
}
