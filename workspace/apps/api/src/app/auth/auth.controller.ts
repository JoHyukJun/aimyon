import { Controller, Get, UseFilters, UseInterceptors } from '@nestjs/common';
import { Body, Delete, Param, Patch, Post, Req, Request, Response, UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { CreateUserDto } from '../common/dtos/user.dto';
import { AuthService } from './auth.service';
import { JwtAccessTokenAuthGuard } from './guards/jwt-accessToken.guard';
import { JwtRefreshTokenAuthGuard } from './guards/jwt-refreshToken.guard';
import { AuthDto } from '../common/dtos/auth.dto';

@Controller('auth')
@UseInterceptors(TransformInterceptor)
@UseFilters(HttpExceptionFilter)
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {

    }

    @UseGuards(JwtAccessTokenAuthGuard)
    @Get()
    async authenticate(@Request() req) {
        const user = req.user;
        user.password = undefined;

        return user;
    }

    @UseGuards(JwtRefreshTokenAuthGuard)
    @Get('/refresh')
    async refreshToken(@Request() req) {
        const userId = req.user['sub'];
        const refreshToken = req.user['refreshToken'];  

        return this.authService.getRefreshToken(userId, refreshToken);
    }

    @Post('/signin')
    async signIn(@Body() authDto: AuthDto) {

        return this.authService.signIn(authDto);
    }

    @Post('/signup')
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.authService.signUp(createUserDto);
    }

    @UseGuards(JwtAccessTokenAuthGuard)
    @Get('/logout')
    async logOut(@Request() req) {
        return this.authService.logOut(req.user['sub']);
    }
}
