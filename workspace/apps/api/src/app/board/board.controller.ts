import { Controller, Get } from '@nestjs/common';
import { Delete, Param, Post, Req } from '@nestjs/common/decorators';
import { BoardService } from './board.service';

@Controller('board')
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

    @Post()
    createPost(@Req() req) {
        return this.boardSerive.createPost(req.body);
    }
}
