import { Controller, Get, UseInterceptors, UseFilters, Patch, HttpException, BadRequestException } from '@nestjs/common';
import { Delete, Param, Post, Req, Body, UseGuards } from '@nestjs/common/decorators';
import { JwtAccessTokenAuthGuard } from '../auth/guards/jwt-accessToken.guard';
import { CreatePostDto, UpdatePostDto } from '../common/dtos/post.dto';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { BoardService } from './board.service';
import { GetUser } from '../common/decorators/user.decorator';
import { User } from '@prisma/client';

@Controller('board')
@UseInterceptors(TransformInterceptor)
@UseFilters(HttpExceptionFilter)
export class BoardController {
    constructor(
        private readonly boardSerive: BoardService
    ) {}

    @Get()
    async getPostAll() {
        try {
            return await this.boardSerive.getPostAll();
        }
        catch(err) {
            throw new BadRequestException(err);
        }
    }

    @UseGuards(JwtAccessTokenAuthGuard)
    @Get(':postId')
    async getPostById(@Param('postId') postId: string) {
        try {
            return await this.boardSerive.getPostById(postId);
        }
        catch(err) {
            throw new BadRequestException(err);
        }
    }

    @Get('/user/:userId')
    async getPostByUser(@Param('userId') userId: string) {
        try {
            return await this.boardSerive.getPostByUser(userId);
        }
        catch(err) {
            throw new BadRequestException(err);
        }
    }

    @Delete(':postId')
    @UseGuards(JwtAccessTokenAuthGuard)
    async deletePost(@Param('postId') postId: string, @GetUser() user: User) {
        try {
            const userId = user.id;

            return await this.boardSerive.deletePost(postId, userId);
        }
        catch(err) {
            throw new BadRequestException(err);
        }
    }

    @Patch(':postId')
    @UseGuards(JwtAccessTokenAuthGuard)
    async updatePost(@Param('postId') postId: string, @Body() updatePostDto: UpdatePostDto, @GetUser() user: User) {
        try {
            const userId = user.id;

            return await this.boardSerive.updatePost(postId, updatePostDto, userId);
        }
        catch(err) {
            throw new BadRequestException(err);
        }
    }

    @Post()
    @UseGuards(JwtAccessTokenAuthGuard)
    async createPost(@GetUser() user: User, @Body() createPostDto: CreatePostDto) {
        try {
            const userId = user.id;

            return await this.boardSerive.createPost(createPostDto, userId);

        }
        catch(err) {
            throw new BadRequestException(err);
        }
    }
}
