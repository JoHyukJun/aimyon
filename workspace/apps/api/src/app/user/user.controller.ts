import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { Body, Delete, Param, Patch, Post, Req } from '@nestjs/common/decorators';
import { CreateUserDto, UpdateProfileDto } from '../common/dtos/create-user.dto';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { UserService } from './user.service';

@UseInterceptors(TransformInterceptor)
@Controller('user')
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
    updateUserProfile(@Param() params, @Body() body: UpdateProfileDto) {
        return this.userService.updateUserProfile(params, body);
    }

    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        return this.userService.signUp(body);
    }
}
