import { Body, Post, Controller, BadRequestException } from "@nestjs/common";
import { ApiTags, ApiBody, ApiOperation } from "@nestjs/swagger";
import { CreateUserService, CreateUserServiceRequest } from "src/services/auth/CreateUserService";
import type { CreateUserServiceResponse } from "src/services/auth/CreateUserService";
import { LoginService, LoginServiceRequest } from "src/services/auth/LoginService";
import type { LoginServiceResponse } from "src/services/auth/LoginService";

@ApiTags("auth")
@Controller("auth")
export class AuthControllers {
    public constructor(
        private readonly createUserService: CreateUserService,
        private readonly loginService: LoginService,
    ) {}

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

    @Post("login")
    @ApiOperation({ summary: "Login" })
    @ApiBody({ type: LoginServiceRequest })
    public async LoginAsync(@Body() request: LoginServiceRequest): Promise<LoginServiceResponse> {
        const user = await this.loginService.ExecuteAsync(request);
        if (!user.Success) {
            throw new BadRequestException(user);
        }

        return user;
    }
}
