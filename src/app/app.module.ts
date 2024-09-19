import { Module } from "@nestjs/common";
import { UserSchema } from "src/Schema/user.schema";
import { FavoriteSchema } from "src/Schema/favorites.schema";

import { AuthControllers } from "src/controllers/auth.controller";
import { UserControllers } from "src/controllers/user.controller";
import { MoviesControllers } from "src/controllers/movies.controller";
import { CreateUserService } from "src/services/auth/CreateUserService";
import { LoginService } from "src/services/auth/LoginService";
import { GetAllUserService } from "src/services/users/GetAllUserService";
import { GetUserByIdService } from "src/services/users/GetUserById";
import { UpdateUserService } from "src/services/users/UpdateUserService";
import { UserValidations } from "src/services/users/UserValidations";

import { AddFavoriteMoviesService } from "src/services/movies/AddFavoriteMoviesService";
import { GetAllPopularMoviesService } from "src/services/movies/GetAllPopularMoviesService";
import { GetAllFavoriteMoviesService } from "src/services/movies/GetAllFavoriteMoviesService";

import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        MongooseModule.forRoot(
            "mongodb://quickmoviesdb:quickmoviesdb@qm-mongo-server/qmdatabase?authSource=admin",
        ),
        MongooseModule.forFeature([
            { name: "user", schema: UserSchema },
            { name: "favorite", schema: FavoriteSchema },
        ]),
        JwtModule.register({
            global: true,
            secret: "quickmovies",
            signOptions: { expiresIn: "3600s" },
        }),
    ],
    controllers: [AuthControllers, UserControllers, MoviesControllers],
    providers: [
        CreateUserService,
        GetAllUserService,
        UserValidations,
        GetUserByIdService,
        UpdateUserService,
        LoginService,
        AddFavoriteMoviesService,
        GetAllPopularMoviesService,
        GetAllFavoriteMoviesService,
    ],
})
export class AppModule {}
