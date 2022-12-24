import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException, NotFoundException } from '@nestjs/common/exceptions';
import { CreateWikiDto } from '../common/dtos/wiki.dto';

@Injectable()
export class WikiService {
    constructor(
        private prisma: PrismaService,
    ) {}

    async getWikiAll() {
        try {
            const response = await this.prisma.wiki.findMany({

            });

            return response;
        }
        catch(e) {
            throw new NotFoundException(e);
        }
    }

    async createWiki(createWikiDto: CreateWikiDto, userId: string) {
        try {
            const response = await this.prisma.wiki.create({
                data: {
                    ...createWikiDto,
                    userId: userId
                },
            });

            return response;
        }
        catch(e) {
            throw new BadRequestException(e);
        }
    }
}
