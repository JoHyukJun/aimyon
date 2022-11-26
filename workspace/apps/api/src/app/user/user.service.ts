import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../common/dtos/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

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

        const response = await this.prisma.user.findUnique({
            where: {
                id: id
            }
        });

        return response;
    }

    async getUserByEmail(email: string) {
        const response = await this.prisma.user.findUnique({
            where: {
                email: email
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

    async signUp(body: CreateUserDto) {
        const userData = body;

        const email = userData.email;
        const password = userData.password;
        const profile = userData.profile;

        const saltOrRounds = 10;
        const hasedPassword = await bcrypt.hash(password, saltOrRounds);

        const response = await this.prisma.user.create({
            data: {
                email: email,
                password: hasedPassword,
                profile: {
                    create: profile
                }
            },
            include: { profile: true }
        });

        return response;
    }
}
