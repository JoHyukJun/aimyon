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
            const updateData = {
                slug: updatePostDto.slug,
                title: updatePostDto.title,
                body: updatePostDto.body,
                published: updatePostDto.published
            };

            const response = await this.prisma.post.update({
                where: {
                    id: id
                },
                data: updateData
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

    async createPost(createPostDto) {
        try {
            const response = await this.prisma.post.create({
                data: {
                    slug: createPostDto.slug,
                    title: createPostDto.title,
                    body: createPostDto.body,
                    published: createPostDto.published,
                    userId: createPostDto.userId
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
