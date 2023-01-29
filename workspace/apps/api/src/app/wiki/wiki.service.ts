import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException, NotFoundException } from '@nestjs/common/exceptions';
import { CreateWikiDto, UpdateWikiDto } from '../common/dtos/wiki.dto';
import { Http2ServerRequest } from 'http2';
import { User } from '@prisma/client';

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
        catch(err) {
            throw new NotFoundException(err);
        }
    }

    async getWikiHistroy(wikiId: string) {
        try {
            const response = await this.prisma.wikiHistory.findMany({
                where: {
                    wikiId: wikiId
                }
            });

            return response;
        }
        catch(err) {
            throw new NotFoundException(err);
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

    async getWikiByTopic(topic: string) {
        try {
            const response = await this.prisma.wiki.findFirst({
                where: {
                    topic: topic
                }
            });

            return response;
        }
        catch(err) {
            throw new NotFoundException(err);
        }
    }

    async getWikiStatusHistory(wikiId: string) {
        try {
            const response = await this.prisma.wikiStatusHistory.findMany({
                where: {
                    wikiId: wikiId
                }
            });

            return response;
        }
        catch(err) {
            throw new BadRequestException(err);
        }
    }

    async createWiki(createWikiDto: CreateWikiDto, user: User) {
        try {
            const userId = user.id;

            const statusHistory = createWikiDto.statusHistory;

            const response = await this.prisma.wiki.create({
                data: {
                    ...createWikiDto,
                    status: 'PENDING',
                    statusHistory: {
                        create: {
                            ...statusHistory,
                            userId: userId
                        }
                    }
                },
            });

            return response;
        }
        catch(err) {
            throw new BadRequestException(err);
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

    async verifyWiki(wikiId: string, user: User) {
        try {
            const response = await this.prisma.wiki.update({
                where: {
                    id: wikiId
                },
                data: {

                }
            });

            return response;
        }
        catch(err) {
            throw new BadRequestException(err);
        }
    }
}
