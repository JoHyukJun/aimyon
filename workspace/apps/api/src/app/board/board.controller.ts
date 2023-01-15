import { Controller, Get, UseInterceptors, UseFilters, Patch, HttpException, BadRequestException } from '@nestjs/common';
import { Delete, Param, Post, Req, Body, UseGuards } from '@nestjs/common/decorators';
import { JwtAccessTokenAuthGuard } from '../auth/guards/jwt-accessToken.guard';
import { CreateCommentDto, CreatePostDto, UpdateCommentDto, UpdatePostDto } from '../common/dtos/post.dto';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { BoardService } from './board.service';
import { GetUser, Roles } from '../common/decorators/user.decorator';
import { User } from '@prisma/client';
import { RoleGuard } from '../auth/guards/role.guard';

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
            return await this.boardSerive.deletePost(postId, user);
        }
        catch(err) {
            throw new BadRequestException(err);
        }
    }

    @Patch(':postId')
    @UseGuards(JwtAccessTokenAuthGuard, RoleGuard)
    async updatePost(@Param('postId') postId: string, @Body() updatePostDto: UpdatePostDto, @GetUser() user: User) {
        try {
            return await this.boardSerive.updatePost(postId, updatePostDto, user);
        }
        catch(err) {
            throw new BadRequestException(err);
        }
    }

    @Post()
    @UseGuards(JwtAccessTokenAuthGuard)
    async createPost(@GetUser() user: User, @Body() createPostDto: CreatePostDto) {
        try {
            return await this.boardSerive.createPost(createPostDto, user);

        }
        catch(err) {
            throw new BadRequestException(err);
        }
    }

    @Post('/comment')
    @UseGuards(JwtAccessTokenAuthGuard)
    async createComment(@GetUser() user: User, @Body() createCommentDto: CreateCommentDto) {
        try {
            return await this.boardSerive.createComment(createCommentDto, user);

        }
        catch(err) {
            throw new BadRequestException(err);
        }
    }

    @Patch('/comment/:commentId')
    @UseGuards(JwtAccessTokenAuthGuard)
    async updateComment(@Param('commentId') commentId: string, @GetUser() user: User, @Body() updateCommentDto: UpdateCommentDto) {
        try {
            return await this.boardSerive.updateComment(commentId, updateCommentDto, user);

        }
        catch(err) {
            throw new BadRequestException(err);
        }
    }

    @Delete('/comment/:commentId')
    @UseGuards(JwtAccessTokenAuthGuard)
    async deleteComment(@Param('commentId') commentId: string, @GetUser() user: User) {
        try {
            return await this.boardSerive.deleteComment(commentId, user);
        }
        catch(err) {
            throw new BadRequestException(err);
        }
    }
}
