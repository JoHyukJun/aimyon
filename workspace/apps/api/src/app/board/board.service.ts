import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from '../common/dtos/post.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BoardService {
    constructor(private prisma: PrismaService) {}

    async getPostAll() {
        try {
            const response = await this.prisma.post.findMany({
            });
    
            return response;
        }
        catch(e) {
            throw new NotFoundException(e);
        }
    }

    async getPostById(postId: string) {
        try {
            const response = await this.prisma.post.findUnique({
                where: {
                    id: postId
                }
            });

            return response;
        }
        catch(e) {
            throw new NotFoundException(e);
        }
    }

    async getPostByUser(userId: string) {
        try {
            const response = await this.prisma.post.findMany({
                where: {
                    userId: userId
                }
            });

            return response;
        }
        catch(e) {
            throw new NotFoundException(e);
        }
    }

    async updatePost(postId: string, updatePostDto: UpdatePostDto) {
        try {
            const id = postId;
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
            throw new BadRequestException(e);
        }
    }

    async deletePost(postId: string) {
        try {
            const id = postId;

            const response = await this.prisma.post.delete({
                where: {
                    id: id
                }
            });

            return response;
        }
        catch(e) {
            throw new NotFoundException(e);
        }
    }

    async createPost(createPostDto: CreatePostDto, userId: string) {
        try {
            const response = await this.prisma.post.create({
                data: {
                    ...createPostDto,
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
