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