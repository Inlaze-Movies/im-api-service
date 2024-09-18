import { Module } from "@nestjs/common";
import { UserSchema } from "src/Schema/user.schema";
import { AuthControllers } from "src/controllers/auth.controller";
import { UserControllers } from "src/controllers/user.controller";
import { CreateUserService } from "src/services/users/CreateUserService";
import { GetAllUserService } from "src/services/users/GetAllUserService";
import { UserValidations } from "src/services/users/UserValidations";

import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [
        MongooseModule.forRoot(
            "mongodb://quickmoviesdb:quickmoviesdb@qm-mongo-server/qmdatabase?authSource=admin",
        ),
        MongooseModule.forFeature([{ name: "user", schema: UserSchema }]),
    ],
    controllers: [AuthControllers, UserControllers],
    providers: [CreateUserService, GetAllUserService, UserValidations],
})
export class AppModule {}
