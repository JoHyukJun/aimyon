import { Controller, Get, UseInterceptors, UseFilters, Patch } from '@nestjs/common';
import { Delete, Param, Post, Req, Body, UseGuards } from '@nestjs/common/decorators';
import { JwtAccessTokenAuthGuard } from '../auth/guards/jwt-accessToken.guard';
import { CreatePostDto, UpdatePostDto } from '../common/dtos/post.dto';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { BoardService } from './board.service';

@Controller('board')
@UseInterceptors(TransformInterceptor)
@UseFilters(HttpExceptionFilter)
export class BoardController {
    constructor(
        private readonly boardSerive: BoardService
    ) {}

    @Get()
    getPostAll() {
        return this.boardSerive.getPostAll();
    }

    @Get(':postId')
    getPostById(@Param('postId') postId: string) {
        return this.boardSerive.getPostById(postId);
    }

    @Get('/user/:userId')
    getPostByUser(@Param('userId') userId: string) {
        return this.boardSerive.getPostByUser(userId);
    }

    @Delete(':postId')
    @UseGuards(JwtAccessTokenAuthGuard)
    deletePost(@Param('postId') postId: string) {
        return this.boardSerive.deletePost(postId);
    }

    @Patch(':postId')
    @UseGuards(JwtAccessTokenAuthGuard)
    updatePost(@Param('postId') postId: string, @Body() updatePostDto: UpdatePostDto) {
        return this.boardSerive.updatePost(postId, updatePostDto);
    }

    @Post()
    @UseGuards(JwtAccessTokenAuthGuard)
    createPost(@Req() req) {
        const createPostDto: CreatePostDto = req.body;
        const userId = req.user['sub'];

        return this.boardSerive.createPost(createPostDto, userId);
    }
}
