import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";
import * as bcrypt from 'bcrypt';
import { AuthDto } from "../../common/dtos/auth.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'email',
            passwordField: 'password'
        });
    }

    async validate(authDto: AuthDto): Promise<any> {
        const user = await this.authService.validateUser(authDto);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}