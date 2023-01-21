import { WikiRequestType } from "@prisma/client";
import { IsNotEmpty, IsString, IsNumber, IsBoolean } from "class-validator";

export class CreateWikiStatusHistoryDto {
    @IsNotEmpty()
    requestType: WikiRequestType;

    @IsString()
    reason: string;
}

export class CreateWikiDto {
    @IsNotEmpty()
    topic: string;

    @IsNotEmpty()
    @IsString()
    body: string;

    @IsNotEmpty()
    statusHistory: CreateWikiStatusHistoryDto;

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

    @IsNotEmpty()
    reqeustType: WikiRequestType;

    @IsString()
    reason: string;
}