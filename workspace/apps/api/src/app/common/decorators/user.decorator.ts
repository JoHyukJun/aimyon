import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { SetMetadata } from "@nestjs/common/decorators";
import { User } from "@prisma/client";


export const GetUser = createParamDecorator((data, ctx: ExecutionContext ): User =>
{
	const req = ctx.switchToHttp().getRequest();
	return req.user;
});

export const Roles = (...args: string[]) => SetMetadata('roles', args);