import { Controller, Get, UseInterceptors, UseFilters, Patch } from '@nestjs/common';
import { Delete, Param, Post, Req, Body } from '@nestjs/common/decorators';
import { UpdatePostDto } from '../common/dtos/create-post.dto';
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

    @Delete(':id')
    deletePost(@Param() params) {
        return this.boardSerive.deletePost(params);
    }

    @Patch(':id')
    updatePost(@Param() params, @Body() updatePostDto: UpdatePostDto) {
        return this.boardSerive.updatePost(params, updatePostDto);
    }

    @Post()
    createPost(@Req() req) {
        return this.boardSerive.createPost(req.body);
    }
}
