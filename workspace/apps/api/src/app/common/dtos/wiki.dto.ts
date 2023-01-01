import { IsNotEmpty, IsString, IsNumber, IsBoolean } from "class-validator";

export class CreateWikiDto {
    @IsNotEmpty()
    topic: string;

    @IsNotEmpty()
    @IsString()
    body: string;

    @IsBoolean()
    published: boolean
}

export class UpdateWikiDto {
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