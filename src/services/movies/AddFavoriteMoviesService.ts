import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Model, Types } from "mongoose";
import type {
    IAddFavoriteMoviesService,
    IAddFavoriteMoviesServiceRequest,
    IAddFavoriteMoviesServiceResponse,
    IAddFavoriteMoviesServiceDataResponseData,
} from "src/core/movies/IAddFavoriteMoviesService";
import type { IFavorite } from "src/Schema/favorites.schema";

@Injectable()
export class AddFavoriteMoviesService implements IAddFavoriteMoviesService {
    public constructor(@InjectModel("favorite") private readonly favoriteModel: Model<IFavorite>) {}

    public ExecuteAsync = async (
        request: IAddFavoriteMoviesServiceRequest,
    ): Promise<IAddFavoriteMoviesServiceResponse> => {
        const validations = await this.ValidateAsync(request);
        if (validations.length > 0) {
            return new AddFavoriteMoviesServiceResponse({
                Message: "Validation error",
                Errors: validations,
                Success: false,
            });
        }
        const favoriteExits = await this.favoriteModel.findOne({
            movieId: request.MovieId,
            user: new Types.ObjectId(request.UserId),
        });

        if (!favoriteExits) {
            const favorite = new this.favoriteModel({
                movieId: request.MovieId,
                originalTitle: request.OriginalTitle,
                isFavorite: true,
                user: request.UserId,
                createdOn: new Date(),
            });
            await favorite.save();
            return new AddFavoriteMoviesServiceResponse({
                Message: "Added to favorites",
                Errors: undefined,
                Success: true,
            });
        }

        favoriteExits.isFavorite = !favoriteExits.isFavorite;
        favoriteExits.updatedOn = new Date();
        await favoriteExits.save();

        if (favoriteExits.isFavorite) {
            return new AddFavoriteMoviesServiceResponse({
                Message: "Added to favorites",
                Errors: undefined,
                Success: true,
            });
        }

        return new AddFavoriteMoviesServiceResponse({
            Message: "Remove to favorites",
            Errors: undefined,
            Success: true,
        });
    };

    public ValidateAsync = async (request: IAddFavoriteMoviesServiceRequest): Promise<string[]> => {
        const errors: string[] = [];

        if (!request.MovieId) {
            errors.push("MovieId is required");
        }
        if (!request.OriginalTitle) {
            errors.push("OriginalTitle is required");
        }
        if (!request.UserId) {
            errors.push("UserId is required");
        }

        return errors;
    };
}

export class AddFavoriteMoviesServiceRequest implements IAddFavoriteMoviesServiceRequest {
    @ApiProperty()
    public MovieId!: number;
    @ApiProperty()
    public OriginalTitle!: string;
    public UserId!: string;
}

export class AddFavoriteMoviesServiceDataResponseData
    implements IAddFavoriteMoviesServiceDataResponseData {}

export class AddFavoriteMoviesServiceResponse implements IAddFavoriteMoviesServiceResponse {
    public Message?: string;
    public Errors?: string[];
    public Success!: boolean;
    public Data?: AddFavoriteMoviesServiceDataResponseData;

    public constructor(data: IAddFavoriteMoviesServiceResponse) {
        this.Message = data.Message;
        this.Errors = data.Errors;
        this.Success = data.Success;
        this.Data = data.Data;
    }
}
