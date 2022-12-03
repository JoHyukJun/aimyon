import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class ProfileDto {
    @IsString()
    name: string;

    @IsNotEmpty()
    userId: string;
}

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsString()
    refreshToken: string;

    @IsNotEmpty()
    profile: ProfileDto;
}

export class UpdateUserDto {
    @IsString()
    refreshToken: string;
}

export class UpdateProfileDto {
    @IsString()
    name: string;

    @IsString()
    refreshToken: string;
}