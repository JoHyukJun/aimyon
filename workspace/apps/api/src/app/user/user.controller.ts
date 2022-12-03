import { Controller, Get, UseInterceptors, UseFilters } from '@nestjs/common';
import { Body, Delete, Param, Patch, Post, Req } from '@nestjs/common/decorators';
import { CreateUserDto, UpdateProfileDto } from '../common/dtos/user.dto';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { UserService } from './user.service';

@Controller('user')
@UseInterceptors(TransformInterceptor)
@UseFilters(HttpExceptionFilter)
export class UserController {
    constructor(
        private readonly userService: UserService) {
    }

    @Get()
    getUserAll() {
        return this.userService.getUserAll();
    }

    @Get(':id')
    getUserById(@Param() params) {
        return this.userService.getUserById(params);
    }

    @Get('/profile/:id')
    getUserProfile(@Param() params) {
        return this.userService.getUserProfile(params);
    }

    @Delete(':id')
    deleteUser(@Param() params) {
        return this.userService.deleteUser(params);
    }

    @Patch('/profile/:id')
    updateUserProfile(@Param() params, @Body() updateProfileDto: UpdateProfileDto) {
        return this.userService.updateUserProfile(params, updateProfileDto);
    }
}
