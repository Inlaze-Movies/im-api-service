import {
    Get,
    Controller,
    BadRequestException,
    UseGuards,
    Post,
    Req,
    Body,
    Param,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from "@nestjs/swagger";
import { Request } from "express";

import { AuthGuard } from "src/services/auth/auth.guard";
import { GetAllPopularMoviesService } from "src/services/movies/GetAllPopularMoviesService";
import type { GetAllPopularMoviesServiceResponse } from "src/services/movies/GetAllPopularMoviesService";

import { GetAllFavoriteMoviesService } from "src/services/movies/GetAllFavoriteMoviesService";
import type {
    GetAllFavoriteMoviesServiceResponse,
    GetAllFavoriteMoviesServiceRequest,
} from "src/services/movies/GetAllFavoriteMoviesService";

import {
    AddFavoriteMoviesService,
    AddFavoriteMoviesServiceRequest,
} from "src/services/movies/AddFavoriteMoviesService";
import type { AddFavoriteMoviesServiceResponse } from "src/services/movies/AddFavoriteMoviesService";

@ApiTags("movies")
@Controller("movies")
export class MoviesControllers {
    public constructor(
        private readonly getAllPopularMoviesService: GetAllPopularMoviesService,
        private readonly addFavoriteMoviesService: AddFavoriteMoviesService,
        private readonly getUserByIdService: GetAllFavoriteMoviesService,
    ) {}

    @UseGuards(AuthGuard)
    @Get("getAllMovies")
    @ApiBearerAuth()
    @ApiOperation({ summary: "Get all users" })
    public async GetAllPopularMoviesAsync(): Promise<GetAllPopularMoviesServiceResponse> {
        const movies = await this.getAllPopularMoviesService.ExecuteAsync();
        if (!movies.Success) {
            throw new BadRequestException(movies);
        }

        return movies;
    }

    @UseGuards(AuthGuard)
    @Get("getAllFavorites/:id")
    @ApiBearerAuth()
    public async GetByIdAsync(
        @Param("id") id: string,
    ): Promise<GetAllFavoriteMoviesServiceResponse> {
        const request: GetAllFavoriteMoviesServiceRequest = { UserId: id };
        const user = await this.getUserByIdService.ExecuteAsync(request);
        if (!user.Success) {
            throw new BadRequestException(user);
        }
        return user;
    }

    @UseGuards(AuthGuard)
    @Post("AddFavoriteMovies")
    @ApiBearerAuth()
    @ApiBody({ type: AddFavoriteMoviesServiceRequest })
    public async AddFavoriteMoviesAsync(
        @Req() req: Request,
        @Body() request: AddFavoriteMoviesServiceRequest,
    ): Promise<AddFavoriteMoviesServiceResponse> {
        request.UserId = req["user"].sub;
        const movies = await this.addFavoriteMoviesService.ExecuteAsync(request);
        if (!movies.Success) {
            throw new BadRequestException(movies);
        }
        return movies;
    }
}
