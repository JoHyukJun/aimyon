import { Controller, Get, UseInterceptors, UseFilters, Patch } from '@nestjs/common';
import { Delete, Param, Post, Req, Body } from '@nestjs/common/decorators';
import { UpdateFeedDto } from '../common/dtos/feed.dto';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { FeedService } from './feed.service';

@Controller('feed')
@UseInterceptors(TransformInterceptor)
@UseFilters(HttpExceptionFilter)
export class FeedController {
    constructor(
        private readonly feedService: FeedService
    ) {}

    @Get()
    getFeedAll() {
        return this.feedService.getFeedAll();
    }

    @Delete(':id')
    deleteFeed(@Param() params) {
        return this.feedService.deleteFeed(params);
    }

    @Patch(':id')
    updateFeed(@Param() params, @Body() updateFeedDto: UpdateFeedDto) {
        return this.feedService.updateFeed(params, updateFeedDto);
    }
}
