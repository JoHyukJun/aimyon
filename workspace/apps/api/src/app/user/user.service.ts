import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from '../common/dtos/user.dto';

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

    async getUserById(userId: string) {
        try {
            const id = userId;

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

            const response = await this.prisma.user.delete({
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

    async updateUser(userId: string, updateUserDto: UpdateUserDto) {
        try {
            const id = userId;
            const updateData = {
                refreshToken: updateUserDto.refreshToken
            };

            const response = await this.prisma.user.update({
                where: {
                    id: id
                },
                data: updateData
            })

            return response;
        }
        catch(e) {
            throw new NotFoundException();
        }
    }

    async updateUserProfile(params, updateProfileDto) {
        try {
            const id = params.id;
            const updateData = {
                name: updateProfileDto.name
            };

            const response = await this.prisma.profile.update({
                where: {
                    userId: id
                },
                data: updateData
            })

            return response;
        }
        catch(e) {
            throw new NotFoundException();
        }
    }
}
