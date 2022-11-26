import { Controller, Get } from '@nestjs/common';
import { Body, Delete, Param, Patch, Post, Req, Request, UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {

    }

    @UseGuards(LocalAuthGuard)
    @Post('/signin')
    async signIn(@Request() req) {
        return req.user;
    }
}
