import type { IService, IServiceRequest, IServiceResponse } from "../IService";

export interface IGetAllPopularMoviesService
    extends IService<
        IGetAllPopularMoviesServiceRequest,
        IGetAllPopularMoviesServiceResponse,
        IGetAllPopularMoviesServiceDataResponseData
    > {}

export interface IGetAllPopularMoviesServiceRequest extends IServiceRequest {}

export interface IGetAllPopularMoviesServiceResponse
    extends IServiceResponse<IGetAllPopularMoviesServiceDataResponseData> {}

export interface IGetAllPopularMoviesServiceDataResponseData {
    page: number;
    results: IMovieInfo[];
    total_pages: number;
    total_results: number;
}

export interface IMovieInfo {
    poster_path: string;
    adult: boolean;
    overview: string;
    release_date: string;
    genre_ids: number[];
    id: number;
    original_title: string;
    original_language: string;
    title: string;
    backdrop_path: string;
    popularity: number;
    vote_count: number;
    video: boolean;
    vote_average: number;
}
