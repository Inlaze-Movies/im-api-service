import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import axios from "axios";
import { Model } from "mongoose";
import type {
    IGetAllFavoriteMoviesService,
    IGetAllFavoriteMoviesServiceRequest,
    IGetAllFavoriteMoviesServiceResponse,
    IGetAllFavoriteMoviesServiceDataResponseData,
    IFavoriteInfo,
} from "src/core/movies/IGetAllFavoriteMoviesService";
import type { IFavorite } from "src/Schema/favorites.schema";

@Injectable()
export class GetAllFavoriteMoviesService implements IGetAllFavoriteMoviesService {
    public constructor(@InjectModel("favorite") private readonly favoriteModel: Model<IFavorite>) {}

    public ExecuteAsync = async (
        request: IGetAllFavoriteMoviesServiceRequest,
    ): Promise<IGetAllFavoriteMoviesServiceResponse> => {
        const validations = await this.ValidateAsync(request);
        if (validations.length > 0) {
            return new GetAllFavoriteMoviesServiceResponse({
                Message: "Validation error",
                Errors: validations,
                Success: false,
            });
        }

        const config = {
            method: "get",
            maxBodyLength: Infinity,
            url: "https://api.themoviedb.org/3/movie/popular?language=es-CO&page=1&api_key=b7dc17611ad8f17b01fb79e815b1bcaa",
            headers: {
                accept: "application/json",
            },
        };

        let movies;

        try {
            const response = await axios.request(config);
            movies = response.data.results;
        } catch (error) {
            return new GetAllFavoriteMoviesServiceResponse({
                Message: "Error fetching movies",
                Errors: [error instanceof Error ? error.message : "Unknown error"],
                Success: false,
            });
        }
        const favoriteItems = await this.favoriteModel.find();

        const favoriteList: IFavoriteInfo[] = favoriteItems
            .filter((favorite) =>
                movies.some((movie) => movie.id === favorite.movieId && favorite.isFavorite),
            )
            .map((favorite) => {
                return {
                    Id: favorite.id.toString(),
                    MovieId: favorite.movieId,
                    OriginTitle: favorite.originalTitle,
                    UserId: request.UserId,
                    CreatedOn: favorite.createdOn,
                    UpdatedOn: favorite.updatedOn || new Date(),
                };
            });

        return new GetAllFavoriteMoviesServiceResponse({
            Message: "Movies fetched successfully",
            Errors: undefined,
            Success: true,
            Data: new GetAllFavoriteMoviesServiceDataResponseData(favoriteList),
        });
    };

    public ValidateAsync = async (
        request: IGetAllFavoriteMoviesServiceRequest,
    ): Promise<string[]> => {
        const errors: string[] = [];

        if (!request.UserId) {
            errors.push("UserId is required");
        }

        return errors;
    };
}

export class GetAllFavoriteMoviesServiceRequest implements IGetAllFavoriteMoviesServiceRequest {
    public UserId!: string;
}

export class GetAllFavoriteMoviesServiceDataResponseData
    implements IGetAllFavoriteMoviesServiceDataResponseData
{
    public FavoriteList!: IFavoriteInfo[];

    public constructor(favoriteList: IFavoriteInfo[]) {
        this.FavoriteList = favoriteList;
    }
}

export class GetAllFavoriteMoviesServiceResponse implements IGetAllFavoriteMoviesServiceResponse {
    public Message?: string;
    public Errors?: string[];
    public Success!: boolean;
    public Data?: IGetAllFavoriteMoviesServiceDataResponseData;

    public constructor(data: IGetAllFavoriteMoviesServiceResponse) {
        this.Message = data.Message;
        this.Errors = data.Errors;
        this.Success = data.Success;
        this.Data = data.Data;
    }
}

export class FavoriteList implements IFavoriteInfo {
    public Id!: string;
    public MovieId!: number;
    public OriginTitle!: string;
    public UserId!: string;
    public CreatedOn!: Date;
    public UpdatedOn!: Date;

    public constructor(data: IFavoriteInfo) {
        this.Id = data.Id;
        this.MovieId = data.MovieId;
        this.OriginTitle = data.OriginTitle;
        this.UserId = data.UserId;
        this.CreatedOn = data.CreatedOn;
        this.UpdatedOn = data.UpdatedOn;
    }
}
