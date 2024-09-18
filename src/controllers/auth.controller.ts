import { Body, Post, Controller, BadRequestException } from "@nestjs/common";
import { ApiTags, ApiBody, ApiOperation } from "@nestjs/swagger";
import { CreateUserService, CreateUserServiceRequest } from "src/services/users/CreateUserService";
import type { CreateUserServiceResponse } from "src/services/users/CreateUserService";

@ApiTags("auth")
@Controller("auth")
export class AuthControllers {
    public constructor(private readonly createUserService: CreateUserService) {}

    @Post("signup")
    @ApiOperation({ summary: "Create a user" })
    @ApiBody({ type: CreateUserServiceRequest })
    public async CreateUserAsync(
        @Body() request: CreateUserServiceRequest,
    ): Promise<CreateUserServiceResponse> {
        const user = await this.createUserService.ExecuteAsync(request);
        if (!user.Success) {
            throw new BadRequestException(user);
        }

        return user;
    }
}
