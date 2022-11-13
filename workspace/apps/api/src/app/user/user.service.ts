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

    async getUserProfile(params) {
        const id = params.id;

        const response = await this.prisma.profile.findFirst({
            where: {
                userId: id
            }
        });

        return response;
    }

    async deleteUser(params) {
        const id = params.id;

        const profileData = await this.prisma.profile.delete({
            where: {
                userId: id
            }
        })

        const userData = await this.prisma.user.delete({
            where: {
                id: id
            }
        });

        const response = {
            user: userData,
            profile: profileData
        }

        return response;
    }

    async updateUserProfile(params, body) {
        const id = params.id;
        const updateData = body;

        const response = await this.prisma.profile.update({
            where: {
                userId: id
            },
            data: {
                name: updateData.name
            }
        })

        return response;
    }

    async signUp(body) {
        const email = body.email;
        const profile = body.profile;

        const response = await this.prisma.user.create({
            data: {
                email: email,
                profile: {
                    create: profile
                }
            },
        });

        return response;
    }
}
