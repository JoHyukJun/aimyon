import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BoardService {
    constructor(private prisma: PrismaService) {}

    async getPostAll() {
        try {
            const response = await this.prisma.post.findMany({
                include: { user: true }
            });
    
            return response;
        }
        catch(e) {
            throw new NotFoundException();
        }
    }

    async updatePost(params, updatePostDto) {
        try {
            const id = params.id;
            const updateData = updatePostDto;

            const response = await this.prisma.post.update({
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

    async deletePost(params) {
        try {
            const id = params.id;

            const response = await this.prisma.post.delete({
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

    async createPost(body) {
        try {
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
        catch(e) {
            throw new BadRequestException();
        }
    }
}
