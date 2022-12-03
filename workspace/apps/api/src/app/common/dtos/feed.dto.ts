import { IsNotEmpty, IsString, IsNumber, IsBoolean } from "class-validator";

export class CreateFeedDto {
    @IsNotEmpty()
    slug: string;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    provider: string;

    @IsNotEmpty()
    postedAt: Date;

    @IsString()
    body: string;

    @IsBoolean()
    published: boolean
}

export class UpdateFeedDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    provider: string;

    @IsNotEmpty()
    postedAt: Date;

    @IsString()
    body: string;

    @IsBoolean()
    published: boolean
}