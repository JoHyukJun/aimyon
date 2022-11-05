import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BoardService {
    constructor(private prisma: PrismaService) {}

    async findBoardAll() {
        return await this.prisma.post.findMany();
    }

    async createBoard(body) {
        // const response = await this.prisma.post.create({
        //     data: {
        //         slug: body.slug,
        //         title: body.title,
        //         body: body.body,
        //         published: body.published,
        //         user: {
        //             connect: {
        //                 where: { email: body.email }
        //             }
        //         },
        //     }
        // });

        // return response;

        return '';
    }
}
