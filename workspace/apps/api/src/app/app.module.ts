import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { AuthModule } from './auth/auth.module';
import { FeedModule } from './feed/feed.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    BoardModule,
    AuthModule,
    FeedModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
