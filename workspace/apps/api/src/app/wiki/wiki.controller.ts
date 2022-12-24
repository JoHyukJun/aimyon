import { Controller, Get, UseInterceptors, UseFilters, Patch } from '@nestjs/common';

import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { WikiService } from './wiki.service';

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
}
