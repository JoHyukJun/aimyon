import { IsNotEmpty, IsString, IsNumber, IsBoolean } from "class-validator";

export class CreatePostDto {
    @IsNotEmpty()
    slug: string;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsString()
    body: string;

    @IsBoolean()
    published: boolean
}

export class UpdatePostDto {
    @IsNotEmpty()
    slug: string;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsString()
    body: string;

    @IsBoolean()
    published: boolean
}

export class CreateCommentDto {
    @IsNotEmpty()
    @IsString()
    postId: string;

    @IsString()
    comment: string;

    @IsBoolean()
    published: boolean
}

export class UpdateCommentDto {
    @IsNotEmpty()
    @IsString()
    postId: string;

    @IsString()
    comment: string;

    @IsBoolean()
    published: boolean
}