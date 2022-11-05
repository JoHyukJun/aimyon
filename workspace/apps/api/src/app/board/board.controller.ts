import { Controller, Get } from '@nestjs/common';
import { Post, Req } from '@nestjs/common/decorators';
import { BoardService } from './board.service';

@Controller('board')
export class BoardController {
    constructor(
        private readonly boardSerive: BoardService
    ) {}

    @Get()
    getBoardAll() {
        return this.boardSerive.findBoardAll();
    }

    @Post()
    createBoard(@Req() req) {
        return this.boardSerive.createBoard(req.body);
    }
}
