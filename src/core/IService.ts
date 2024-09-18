export interface IService<
    TRequest extends IServiceRequest | undefined,
    TResponse extends IServiceResponse<TDataResponse>,
    TDataResponse,
> {
    ExecuteAsync: TRequest extends IServiceRequest
        ? (request: TRequest) => Promise<TResponse>
        : () => Promise<TResponse>;

    ValidateAsync: TRequest extends IServiceRequest
        ? (request: TRequest) => Promise<string[]>
        : () => Promise<string[]>;
}

export interface IServiceResponse<T> {
    Message?: string;
    Errors?: string[];
    Success: boolean;
    Data?: T;
}

export interface IServiceRequest {}
