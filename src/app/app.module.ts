import { Module } from "@nestjs/common";
import { UserSchema } from "src/Schema/user.schema";
import { AuthControllers } from "src/controllers/auth.controller";
import { UserControllers } from "src/controllers/user.controller";
import { CreateUserService } from "src/services/auth/CreateUserService";
import { LoginService } from "src/services/auth/LoginService";
import { GetAllUserService } from "src/services/users/GetAllUserService";
import { GetUserByIdService } from "src/services/users/GetUserById";
import { UpdateUserService } from "src/services/users/UpdateUserService";
import { UserValidations } from "src/services/users/UserValidations";

import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        MongooseModule.forRoot(
            "mongodb://quickmoviesdb:quickmoviesdb@qm-mongo-server/qmdatabase?authSource=admin",
        ),
        MongooseModule.forFeature([{ name: "user", schema: UserSchema }]),
        JwtModule.register({
            global: true,
            secret: "quickmovies",
            signOptions: { expiresIn: "3600s" },
        }),
    ],
    controllers: [AuthControllers, UserControllers],
    providers: [
        CreateUserService,
        GetAllUserService,
        UserValidations,
        GetUserByIdService,
        UpdateUserService,
        LoginService,
    ],
})
export class AppModule {}
