import { IsNotEmpty, IsString, IsNumber, IsBoolean } from "class-validator";

export class AuthDto {
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}