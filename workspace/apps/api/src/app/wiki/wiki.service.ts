import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException, NotFoundException } from '@nestjs/common/exceptions';
import { CreateWikiDto, UpdateWikiDto } from '../common/dtos/wiki.dto';

@Injectable()
export class WikiService {
    constructor(
        private prisma: PrismaService,
    ) {}

    async getWikiAll() {
        try {
            const response = await this.prisma.wiki.findMany({
                where: {
                    status: 'APPROVED'
                }
            });

            return response;
        }
        catch(e) {
            throw new NotFoundException(e);
        }
    }

    async getWikiById(wikiId: string) {
        try {
            const response = await this.prisma.wiki.findUnique({
                where: {
                    id: wikiId
                }
            });

            return response;
        }
        catch(err) {
            throw new BadRequestException(err);
        }
    }

    async createWiki(createWikiDto: CreateWikiDto) {
        try {
            const response = await this.prisma.wiki.create({
                data: {
                    ...createWikiDto,
                    status: 'APPROVED',
                    postedAt: new Date()
                },
            });

            return response;
        }
        catch(e) {
            throw new BadRequestException(e);
        }
    }

    async updateWiki(wikiId: string, updateWikiDto: UpdateWikiDto) {
        try {
            const response = await this.prisma.wiki.update({
                where: {
                    id: wikiId
                },
                data: {
                    ...updateWikiDto
                }
            });

            return response;
        }
        catch(err) {
            throw new BadRequestException(err);
        }
    }

    async deleteWiki(wikiId: string) {
        try {
            const response = await this.prisma.wiki.delete({
                where: {
                    id: wikiId
                }
            });

            return response;
        }
        catch(err) {
            throw new BadRequestException(err);
        }
    }
}
