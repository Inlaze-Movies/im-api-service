import { Injectable } from "@nestjs/common";
import axios from "axios";
import type {
    IGetAllPopularMoviesService,
    IGetAllPopularMoviesServiceRequest,
    IGetAllPopularMoviesServiceResponse,
    IGetAllPopularMoviesServiceDataResponseData,
    IMovieInfo,
} from "src/core/movies/IGetAllPopularMoviesService";

@Injectable()
export class GetAllPopularMoviesService implements IGetAllPopularMoviesService {
    public constructor() {}

    public ExecuteAsync = async (): Promise<IGetAllPopularMoviesServiceResponse> => {
        const validations = await this.ValidateAsync();
        if (validations.length > 0) {
            return new GetAllPopularMoviesServiceResponse({
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

        let movies: IGetAllPopularMoviesServiceDataResponseData;

        try {
            const response = await axios.request(config);
            movies = response.data;
        } catch (error) {
            return new GetAllPopularMoviesServiceResponse({
                Message: "Error fetching movies",
                Errors: [error instanceof Error ? error.message : "Unknown error"],
                Success: false,
            });
        }

        return new GetAllPopularMoviesServiceResponse({
            Message: "Movies fetched successfully",
            Errors: undefined,
            Success: true,
            Data: new GetAllPopularMoviesServiceDataResponseData(movies),
        });
    };

    public ValidateAsync = async (): Promise<string[]> => {
        const errors: string[] = [];

        return errors;
    };
}

export class GetAllPopularMoviesServiceRequest implements IGetAllPopularMoviesServiceRequest {}

export class GetAllPopularMoviesServiceDataResponseData
    implements IGetAllPopularMoviesServiceDataResponseData
{
    public page!: number;
    public results!: IMovieInfo[];
    public total_pages!: number;
    public total_results!: number;

    public constructor(data: IGetAllPopularMoviesServiceDataResponseData) {
        this.page = data.page;
        this.results = data.results;
        this.total_pages = data.total_pages;
        this.total_results = data.total_results;
    }
}

export class GetAllPopularMoviesServiceResponse implements IGetAllPopularMoviesServiceResponse {
    public Message?: string;
    public Errors?: string[];
    public Success!: boolean;
    public Data?: GetAllPopularMoviesServiceDataResponseData;

    public constructor(data: IGetAllPopularMoviesServiceResponse) {
        this.Message = data.Message;
        this.Errors = data.Errors;
        this.Success = data.Success;
        this.Data = data.Data;
    }
}
