import { Controller, Get, UseInterceptors, UseFilters, Patch, Post } from '@nestjs/common';

import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { WikiService } from './wiki.service';
import { GetUser } from '../common/decorators/user.decorator';
import { User } from '@prisma/client';
import { Body, Param, UseGuards } from '@nestjs/common/decorators';
import { CreateWikiDto } from '../common/dtos/wiki.dto';
import { JwtAccessTokenAuthGuard } from '../auth/guards/jwt-accessToken.guard';

@Controller('wiki')
@UseInterceptors(TransformInterceptor)
@UseFilters(HttpExceptionFilter)
export class WikiController {
    constructor(
        private readonly wikiService: WikiService
    ) {}

    @Get()
    getWikiAll() {
        return this.wikiService.getWikiAll();
    }

    @Get(':topic')
    getWikiByTopic(@Param('topic') topic: string) {
        return this.wikiService.getWikiByTopic(topic);
    }

    @Post()
    @UseGuards(JwtAccessTokenAuthGuard)
    createWiki(@GetUser() user: User, @Body() createWikiDto: CreateWikiDto) {
        return this.wikiService.createWiki(createWikiDto, user);
    }

    @Post(':wikiId')
    @UseGuards(JwtAccessTokenAuthGuard)
    verifyWiki(@Param('wikiId') wikiId: string, @GetUser() user: User) {
        return this.wikiService.verifyWiki(wikiId, user);
    }
}
