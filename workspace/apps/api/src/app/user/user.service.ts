import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UpdateProfileDto, UpdateUserDto } from '../common/dtos/user.dto';

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService
    ) {}

    private excludeFieldsArray<User, Key extends keyof User>(
        users: User[],
        keys: Key[]
      ): Omit<User[], Key>{
        for (const user of users) {
            for (const key of keys) {
                delete user[key]
              }
        }

        return users;
    }

    private excludeFieldsObject<User, Key extends keyof User>(
        user: User,
        keys: Key[]
      ): Omit<User, Key>{
        for (const key of keys) {
            delete user[key]
        }

        return user;
    }

    async getUserAll() {
        try {
            const users = await this.prisma.user.findMany();
            const response = this.excludeFieldsArray(users, ['password']);

            return response;
        }
        catch(err) {
            throw new NotFoundException(err);
        }
    }

    async getUserById(userId: string) {
        try {
            const id = userId;

            const user = await this.prisma.user.findUnique({
                where: {
                    id: id
                }
            });

            const response = this.excludeFieldsObject(user, ['password']);

            return response;
        }
        catch(err) {
            throw new NotFoundException(err);
        }
    }

    async getUserByEmail(email: string) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    email: email
                }
            });

            const response = user;
    
            return response;
        }
        catch(err) {
            throw new NotFoundException(err);
        }
    }

    async getUserProfile(userId: string) {
        try {
            const response = await this.prisma.profile.findFirst({
                where: {
                    userId: userId
                }
            });

            return response;
        }
        catch(err) {
            throw new NotFoundException(err);
        }
    }

    async getUserProfileById(userId: string) {
        try {
            const response = await this.prisma.profile.findFirst({
                where: {
                    userId: userId
                }
            });

            return response;
        }
        catch(err) {
            throw new NotFoundException(err);
        }
    }

    async deleteUser(params) {
        try {
            const id = params.id;

            const user = await this.prisma.user.delete({
                where: {
                    id: id
                }
            });

            const response = this.excludeFieldsObject(user, ['password']);

            return response;
        }
        catch(err) {
            throw new NotFoundException(err);
        }
    }

    async updateUser(userId: string, updateUserDto: UpdateUserDto) {
        try {
            const id = userId;
            const updateData = {
                refreshToken: updateUserDto.refreshToken
            };

            const user = await this.prisma.user.update({
                where: {
                    id: id
                },
                data: updateData
            })

            const response = this.excludeFieldsObject(user, ['password']);

            return response;
        }
        catch(err) {
            throw new NotFoundException(err);
        }
    }

    async updateUserProfile(params, updateProfileDto: UpdateProfileDto) {
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
        catch(err) {
            throw new NotFoundException(err);
        }
    }
}
