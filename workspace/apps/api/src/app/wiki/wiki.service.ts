import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WikiService {
    constructor(
        private prisma: PrismaService,
    ) {}
}