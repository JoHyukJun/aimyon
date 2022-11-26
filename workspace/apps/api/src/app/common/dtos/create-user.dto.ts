import { IsNotEmpty, IsString, IsNumber } from "class-validator";

class ProfileDto {
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

    @IsNotEmpty()
    profile: ProfileDto;
}

export class UpdateProfileDto {
    @IsString()
    name: string;
}