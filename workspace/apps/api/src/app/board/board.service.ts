import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateCommentDto, CreatePostDto, UpdatePostDto, UpdateCommentDto } from '../common/dtos/post.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';

@Injectable()
export class BoardService {
    constructor(
        private prisma: PrismaService,
        private userService: UserService) {}

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

    async getComment(postId: string) {
        try {
            const response = await this.prisma.comment.findMany({
                where: {
                    postId: postId
                }
            });

            return response;
        }
        catch(e) {
            throw new BadRequestException(e);
        }
    }

    async createComment(createCommentDto: CreateCommentDto, userId: string) {
        try {
            const profileObject = await this.userService.getUserProfileById(userId);

            const userName = profileObject.name;

            const response = await this.prisma.comment.create({
                data: {
                    ...createCommentDto,
                    userName: userName,
                    userId: userId
                }
            });

            return response;
        }
        catch(e) {
            throw new BadRequestException(e);
        }
    }

    async updateComment(commentId: string, updateCommentDto: UpdateCommentDto, userId: string) {
        try {
            const response = await this.prisma.comment.update({
                where: {
                    id: commentId
                },
                data: {
                    ...updateCommentDto
                }
            });

            return response;
        }
        catch(e) {
            throw new BadRequestException(e);
        }
    }

    async deleteComment(commentId: string) {
        try {
            const response = await this.prisma.comment.delete({
                where: {
                    id: commentId
                }
            });

            return response;
        }
        catch(e) {
            throw new BadRequestException(e);
        }
    }
}
