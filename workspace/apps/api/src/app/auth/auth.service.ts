import { HttpException, Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../common/dtos/user.dto';
import * as bcrypt from 'bcrypt';
import { AuthDto } from '../common/dtos/auth.dto';
import { constants } from "../common/constants/auth.constants";
import { exceptionMessage } from '../common/exceptions/exception.message';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    private async verifyPassword(password: string, hashedPassword: string) {
        const isValidPassword = await bcrypt.compare(password, hashedPassword);

        if (!isValidPassword) {
            throw new BadRequestException(exceptionMessage.INVALID_USER_PASSWORD);
        }

        return isValidPassword;
    }

    async validateUser(authDto: AuthDto) {
        try {
            const email = authDto.email;
            const pass = authDto.password;
            const user = await this.userService.getUserByEmail(email);

            const isValidUser = await this.verifyPassword(pass, user.password);

            const { password, ...result } = user;

            return user;

        }
        catch(e) {
            throw new UnauthorizedException(e);
        }
    }

    async getTokens(userId: string, email: string, role) {
        try {
            const [accessToken, refreshToken] = await Promise.all([
                this.jwtService.signAsync(
                    {
                        id: userId,
                        email: email,
                        role: role
                    },
                    {
                        secret: constants.ACCESS_SECRET,
                        expiresIn: '1d',
                    },
                ),
                this.jwtService.signAsync(
                    {
                        id: userId,
                        email: email,
                        role: role
                    },
                    {
                        secret: constants.REFRESH_SECRET,
                        expiresIn: '30d',
                    },
                ),
            ]);

            const response = {
                accessToken: accessToken,
                refreshToken: refreshToken
            }
    
            return response;
        }
        catch(e) {
            throw new BadRequestException(e);
        }
    }

    async getRefreshToken(userId: string, refreshToken: string) {
        try {
            const user = await this.userService.getUserById(userId);
            const isValidRefreshToken = await bcrypt.compare(refreshToken, user.refreshToken);
            const tokens = await this.getTokens(user.id, user.email, user.role);
            const updateRefreshToken = await this.updateRefreshToken(user.id, tokens.refreshToken);

            const response = tokens;

            return response;
        }
        catch(e) {
            throw new UnauthorizedException(e);
        }
    }

    async updateRefreshToken(userId: string, refreshToken: string) {
        try {
            const saltOrRounds = 8;
            const hashedRefreshToken = await bcrypt.hash(refreshToken, saltOrRounds);
            const updateData = {
                refreshToken: hashedRefreshToken
            };

            const resposne = await this.userService.updateUser(userId, updateData);

            return resposne;
        }
        catch(e) {
            throw new BadRequestException(e);
        }
    }

    async signIn(authDto: AuthDto) {
        try {
            const user = await this.validateUser(authDto);
            const tokens = await this.getTokens(user.id, user.email, user.role);
            const updateRefreshToken = await this.updateRefreshToken(user.id, tokens.refreshToken);

            const response = tokens;

            return response;
        }
        catch(err) {
            throw new BadRequestException(err);
        }
    }

    async signUp(createUserDto: CreateUserDto) {
        try {
            const createUserData = createUserDto;

            const password = createUserData.password;
            const profile = createUserData.profile;

            const saltOrRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltOrRounds);

            const user = await this.prisma.user.create({
                data: {
                    ...createUserDto,
                    password: hashedPassword,
                    profile: {
                        create: profile
                    }
                },
                include: { profile: true }
            });

            const tokens = await this.getTokens(user.id, user.email, user.role);
            const updateRefreshToken = await this.updateRefreshToken(user.id, tokens.refreshToken);
            const response = tokens;

            return response;
        }
        catch(err) {
            throw new BadRequestException(err);
        }
    }

    async logOut(userId: string) {
        try {
            const updateData = {
                refreshToken: null
            };

            const response = await this.userService.updateUser(userId, updateData);
    
            return response;
        }
        catch(err) {
            throw new BadRequestException(err);
        }
    }
}
