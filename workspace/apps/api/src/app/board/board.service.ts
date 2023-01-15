import { Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { CreateCommentDto, CreatePostDto, UpdatePostDto, UpdateCommentDto } from '../common/dtos/post.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { User } from '@prisma/client';

@Injectable()
export class BoardService {
    constructor(
        private prisma: PrismaService,
        private userService: UserService) {}

    async getPostAll() {
        try {
            const response = await this.prisma.post.findMany({
                where: {
                    published: true
                }
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
                },

                include: { comments: true }
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

    async updatePost(postId: string, updatePostDto: UpdatePostDto, user: User) {
        try {
            const userId = user.id;
            const userRole = user.role;
            const postObject = await this.getPostById(postId);

            if (!postObject) {
                throw new BadRequestException('INVALID postId');
            }

            if (postObject.userId !== userId && !(userRole === 'MASTER')) {
                throw new UnauthorizedException('Invalid user reqeust');
            }

            const response = await this.prisma.post.update({
                where: {
                    id: postId
                },
                data: {
                    ...updatePostDto
                }
            });

            return response;
        }
        catch(err) {
            throw new BadRequestException(err);
        }
    }

    async deletePost(postId: string, user: User) {
        try {
            const userId = user.id;
            const userRole = user.role;

            const postObject = await this.getPostById(postId);

            if (!postObject) {
                throw new BadRequestException('INVALID postId');
            }

            if (postObject.userId !== userId && !(userRole === 'MASTER')) {
                throw new UnauthorizedException('Invalid user reqeust');
            }

            const response = await this.prisma.post.delete({
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

    async createPost(createPostDto: CreatePostDto, user: User) {
        try {
            const userId = user.id;

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

    async createComment(createCommentDto: CreateCommentDto, user: User) {
        try {
            const userId = user.id;
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

    async updateComment(commentId: string, updateCommentDto: UpdateCommentDto, user: User) {
        try {
            const userId = user.id;
            const userRole = user.role;

            const commentObject = await this.prisma.comment.findUnique({
                where: {
                    id: commentId
                }
            });

            if (!commentObject) {
                throw new BadRequestException('INVALID commentId');
            }

            if (commentObject.userId !== userId && !(userRole === 'MASTER')) {
                throw new UnauthorizedException('Invalid user reqeust');
            }

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
        catch(err) {
            throw new BadRequestException(err);
        }
    }

    async deleteComment(commentId: string, user: User) {
        try {
            const userId = user.id;
            const userRole = user.role;

            const commentObject = await this.prisma.comment.findUnique({
                where: {
                    id: commentId
                }
            });

            if (!commentObject) {
                throw new BadRequestException('Invalid comment db info');
            }

            if (commentObject.userId !== userId && !(userRole === 'MASTER')) {
                throw new UnauthorizedException('Invalid user reqeust');
            }

            const response = await this.prisma.comment.delete({
                where: {
                    id: commentId
                }
            });

            return response;
        }
        catch(err) {
            throw new BadRequestException(err);
        }
    }
}
