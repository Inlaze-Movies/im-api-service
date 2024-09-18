import { Get, Controller, BadRequestException } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { GetAllUserService } from "src/services/users/GetAllUserService";
import type { GetAllUserServiceResponse } from "src/services/users/GetAllUserService";

@ApiTags("user")
@Controller("user")
export class UserControllers {
    public constructor(private readonly getAllUserService: GetAllUserService) {}

    @Get("getAll")
    @ApiOperation({ summary: "Get all users" })
    public async CreateUserAsync(): Promise<GetAllUserServiceResponse> {
        const user = await this.getAllUserService.ExecuteAsync();
        if (!user.Success) {
            throw new BadRequestException(user);
        }

        return user;
    }
}
