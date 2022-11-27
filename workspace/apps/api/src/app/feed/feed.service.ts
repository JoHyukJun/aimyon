import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FeedService {
    constructor(
        private prisma: PrismaService
    ) {}

    async getFeedAll() {
        try {
            const response = await this.prisma.feed.findMany();

            return response;
        }
        catch(e) {
            throw new NotFoundException();
        }
    }

    async updateFeed(params, updateFeedDto) {
        try {
            const id = params.id;
            const updateData = updateFeedDto;

            const response = await this.prisma.feed.update({
                where: {
                    id: id
                },
                data: {

                }
            });

            return response;
        }
        catch(e) {
            throw new BadRequestException();
        }
    }

    async deleteFeed(params) {
        try {
            const id = params.id;

            const response = await this.prisma.feed.delete({
                where: {
                    id: id
                }
            });

            return response;
        }
        catch(e) {
            throw new NotFoundException();
        }
    }
}
