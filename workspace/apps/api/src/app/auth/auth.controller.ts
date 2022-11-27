import { Controller, Get, UseFilters, UseInterceptors } from '@nestjs/common';
import { Body, Delete, Param, Patch, Post, Req, Request, UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
@UseInterceptors(TransformInterceptor)
@UseFilters(HttpExceptionFilter)
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {

    }

    @UseGuards(LocalAuthGuard)
    @Post('/signin')
    async signIn(@Request() req) {
        return this.authService.signIn(req);
        
    }
}
