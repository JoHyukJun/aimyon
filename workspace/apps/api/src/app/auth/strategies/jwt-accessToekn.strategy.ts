import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { constants } from "../../common/constants/auth.constants";

type JwtPayload = {
    sub: string;
    email: string;
}

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            usernameField: 'email',
            passwordField: 'password',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpriation: false,
            secretOrKey: constants.ACCESS_SECRET,
        });
    }

    // node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"

    async validate(payload: JwtPayload) {
        return payload;
    }
}