import { Controller, Get } from '@nestjs/common';
import { Post, Req } from '@nestjs/common/decorators';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Get()
    getUserAll() {
        return this.authService.getUserAll();
    }

    @Post('/signup')
    createUser(@Req() req) {
        return this.authService.signUp(req.body);
    }


}
