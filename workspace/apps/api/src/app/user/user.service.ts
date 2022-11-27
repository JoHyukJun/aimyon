import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from '../common/dtos/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService
    ) {}

    async getUserAll() {
        try {
            const response = await this.prisma.user.findMany();

            return response;
        }
        catch(e) {
            throw new NotFoundException();
        }
    }

    async getUserById(params) {
        try {
            const id = params.id;

        const response = await this.prisma.user.findUnique({
            where: {
                id: id
            }
        });

        return response;
        }
        catch(e) {
            throw new NotFoundException();
        }
    }

    async getUserByEmail(email: string) {
        try {
            const response = await this.prisma.user.findUnique({
                where: {
                    email: email
                }
            });
    
            return response;
        }
        catch(e) {
            throw new NotFoundException();
        }
    }

    async getUserProfile(params) {
        try {
            const id = params.id;

            const response = await this.prisma.profile.findFirst({
                where: {
                    userId: id
                }
            });

            return response;
        }
        catch(e) {
            throw new NotFoundException();
        }
    }

    async deleteUser(params) {
        try {
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
        catch(e) {
            throw new NotFoundException();
        }
    }

    async updateUserProfile(params, body) {
        try {
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
        catch(e) {
            throw new NotFoundException();
        }
    }

    async signUp(body: CreateUserDto) {
        try {
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
        catch(e) {
            throw new BadRequestException();
        }
    }
}
