import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { Request } from 'express';
import { jwtConstants } from "../constants/auth.constants";

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor() {
        super({
            usernameField: 'email',
            passwordField: 'password',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpriation: false,
            secretOrKey: jwtConstants.REFRESH_SECRET,
            passReqToCallback: true,
        });
    }

    // node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"

    async validate(req: Request, payload: any) {
        const refreshToken = req.get('Authorization').replace('Bearer', '').trim();

        return { ...payload, refreshToken };
    }
}