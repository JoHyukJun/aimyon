import { Controller, Get, UseInterceptors, UseFilters, Patch, Post } from '@nestjs/common';

import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { WikiService } from './wiki.service';
import { GetUser } from '../common/decorators/user.decorator';
import { User } from '@prisma/client';
import { Body, Param, UseGuards } from '@nestjs/common/decorators';
import { CreateWikiDto, UpdateWikiDto } from '../common/dtos/wiki.dto';
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

    @Get(':id')
    getWikiById(@Param('id') wikiId: string) {
        return this.wikiService.getWikiById(wikiId);
    }

    @Get('history/:id')
    getWikiHistoryById(@Param('id') wikiId: string) {
        return this.wikiService.getWikiHistroy(wikiId);
    }

    @Post()
    @UseGuards(JwtAccessTokenAuthGuard)
    createWiki(@GetUser() user: User, @Body() createWikiDto: CreateWikiDto) {
        return this.wikiService.createWiki(createWikiDto, user);
    }

    @Patch(':id')
    @UseGuards(JwtAccessTokenAuthGuard)
    updateWiki(@Param('id') wikiId: string, @GetUser() user: User, @Body() updateWikiDto: UpdateWikiDto) {
        return this.wikiService.updateWiki(wikiId, updateWikiDto);
    }

    @Post(':wikiId')
    @UseGuards(JwtAccessTokenAuthGuard)
    verifyWiki(@Param('wikiId') wikiId: string, @GetUser() user: User) {
        return this.wikiService.verifyWiki(wikiId, user);
    }
}
