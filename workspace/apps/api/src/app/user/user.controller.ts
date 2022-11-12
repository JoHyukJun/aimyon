import { Controller, Get } from '@nestjs/common';
import { Body, Delete, Param, Patch, Post, Req } from '@nestjs/common/decorators';
import { UserService } from './user.service';

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

    @Delete(':id')
    deleteUser(@Param() params) {
        return this.userService.deleteUser(params);
    }

    @Patch(':id')
    updateUser(@Param() params, @Body() body) {
        return this.userService.updateUser(params, body);
    }

    @Post('/signup')
    createUser(@Req() req) {
        return this.userService.signUp(req.body);
    }
}
