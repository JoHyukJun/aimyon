import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService
    ) {}

    async getUserAll() {
        const response = await this.prisma.user.findMany();

        return response;
    }

    async getUserById(params) {
        const id = params.id;

        const response = await this.prisma.user.findFirst({
            where: {
                id: id
            }
        });

        return response;
    }

    async deleteUser(params) {
        const id = params.id;

        const response = await this.prisma.user.delete({
            where: {
                id: id
            }
        });

        return response;
    }

    async updateUser(params, body) {
        const id = params.id;
        const updateData = body;

        const response = await this.prisma.user.update({
            where: {
                id: id
            },
            data: {
            }
        })
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
