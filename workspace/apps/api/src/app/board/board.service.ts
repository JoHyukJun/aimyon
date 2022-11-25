import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BoardService {
    constructor(private prisma: PrismaService) {}

    async getPostAll() {
        return await this.prisma.post.findMany({
            include: { user: true }
        });
    }

    async updatePost(params, body) {
        const id = params.id;
        const updateData = body;

        const response = await this.prisma.post.update({
            where: {
                id: id
            },
            data: {
            }
        });

        return response;
    }

    async deletePost(params) {
        const id = params.id;

        const response = await this.prisma.post.delete({
            where: {
                id: id
            }
        });

        return response;
    }

    async createPost(body) {
        const response = await this.prisma.post.create({
            data: {
                slug: body.slug,
                title: body.title,
                body: body.body,
                published: body.published,
                userId: body.userId
            },
            include: { user: true }
        });

        return response;
    }
}
