import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    PrismaModule
  ],
  controllers: [BoardController],
  providers: [BoardService, UserService]
})
export class BoardModule {}
