import { Get, Controller, BadRequestException, UseGuards, Post, Param, Body } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from "@nestjs/swagger";

import { AuthGuard } from "src/services/auth/auth.guard";
import { GetAllUserService } from "src/services/users/GetAllUserService";
import type { GetAllUserServiceResponse } from "src/services/users/GetAllUserService";

import { GetUserByIdService } from "src/services/users/GetUserById";
import type {
    GetUserByIdServiceResponse,
    GetUserByIdServiceRequest,
} from "src/services/users/GetUserById";

import { UpdateUserService, UpdateUserServiceRequest } from "src/services/users/UpdateUserService";
import type { UpdateUserServiceResponse } from "src/services/users/UpdateUserService";

@ApiTags("user")
@Controller("user")
export class UserControllers {
    public constructor(
        private readonly getAllUserService: GetAllUserService,
        private readonly getUserByIdService: GetUserByIdService,
        private readonly updateUserService: UpdateUserService,
    ) {}

    @UseGuards(AuthGuard)
    @Get("getAll")
    @ApiBearerAuth()
    @ApiOperation({ summary: "Get all users" })
    public async CreateUserAsync(): Promise<GetAllUserServiceResponse> {
        const user = await this.getAllUserService.ExecuteAsync();
        if (!user.Success) {
            throw new BadRequestException(user);
        }

        return user;
    }

    @UseGuards(AuthGuard)
    @Get("getByUserId/:id")
    @ApiBearerAuth()
    public async GetByIdAsync(@Param("id") id: string): Promise<GetUserByIdServiceResponse> {
        const request: GetUserByIdServiceRequest = { Id: id };
        const user = await this.getUserByIdService.ExecuteAsync(request);
        if (!user.Success) {
            throw new BadRequestException(user);
        }

        return user;
    }

    @UseGuards(AuthGuard)
    @Post("updateUser")
    @ApiBearerAuth()
    @ApiBody({ type: UpdateUserServiceRequest })
    public async UpdateUserAsync(
        @Body() request: UpdateUserServiceRequest,
    ): Promise<UpdateUserServiceResponse> {
        const user = await this.updateUserService.ExecuteAsync(request);
        if (!user.Success) {
            throw new BadRequestException(user);
        }

        return user;
    }
}
