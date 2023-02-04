import { Controller, Get, UseInterceptors, UseFilters, BadRequestException } from '@nestjs/common';
import { Body, Delete, Param, Patch, Post, Req, UseGuards } from '@nestjs/common/decorators';
import { CreateUserDto, UpdateProfileDto } from '../common/dtos/user.dto';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { UserService } from './user.service';
import { JwtAccessTokenAuthGuard } from '../auth/guards/jwt-accessToken.guard';
import { GetUser } from '../common/decorators/user.decorator';
import { User } from '@prisma/client';

@Controller('user')
@UseInterceptors(TransformInterceptor)
@UseFilters(HttpExceptionFilter)
export class UserController {
    constructor(
        private readonly userService: UserService) {
    }

    @Get()
    async getUserAll() {
        try {
            return await this.userService.getUserAll();
        }
        catch(err) {
            throw new BadRequestException(err);
        }
    }

    @Get(':id')
    async getUserById(@Param('id') userId: string) {
        try {
            return await this.userService.getUserById(userId);
        }
        catch(err) {
            throw new BadRequestException(err);
        }
    }

    @Get('/profile/:id')
    async getUserProfile(@Param('id') userId: string) {
        try {
            return await this.userService.getUserProfile(userId);
        }
        catch(err) {
            throw new BadRequestException(err);
        }
    }

    @Delete(':id')
    @UseGuards(JwtAccessTokenAuthGuard)
    async deleteUser(@Param('id') userId: string, @GetUser() user: User) {
        try {
            return await this.userService.deleteUser(userId);
        }
        catch(err) {
            throw new BadRequestException(err);
        }
    }

    @Patch('/profile/:id')
    @UseGuards(JwtAccessTokenAuthGuard)
    async updateUserProfile(@Param('id') userId: string, @Body() updateProfileDto: UpdateProfileDto) {
        try {
            return await this.userService.updateUserProfile(userId, updateProfileDto);
        }
        catch(err) {
            throw new BadRequestException(err);
        }
    }
}
