import { Controller, Get, UseFilters, UseInterceptors } from '@nestjs/common';
import { Body, Delete, Param, Patch, Post, Req, Request, Response, UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
@UseInterceptors(TransformInterceptor)
@UseFilters(HttpExceptionFilter)
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {

    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async authenticate(@Request() req) {
        const user = req.user;
        user.password = undefined;

        return user;
    }

    @UseGuards(LocalAuthGuard)
    @Post('/signin')
    async signIn(@Request() req) {

        return this.authService.signIn(req);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/logout')
    async logOut(@Request() req, @Response() res) {
        res.setHeader(
            'Set-Cookie',
            this.authService.logOut(),
        );

        return res.sendStatus(200);
    }
}
