namespace NgCommerce.Model;

public record Result<TData, TErr>(bool Success, TData? Data, TErr? Error)
{
    public void Match(Action<TData> onSuccess, Action<TErr> onError)
    {
        if (Success)
        {
            onSuccess(Data!);
        }
        else
        {
            onError(Error!);
        }
    }

    public TResult Match<TResult>(Func<TData, TResult> onSuccess, Func<TErr, TResult> onError) 
        => Success ? onSuccess(Data!) : onError(Error!);
}

public record Result<TData> : Result<TData, string>
{
    public Result(bool Success, TData? Data, string? Error) 
        : base(Success, Data, Error)
    {
    }
}

public record Result(bool Success, string ErrorMessage)
{
    public static Result<TData, TErr> Ok<TData, TErr>(TData data) => new(true, data, default);

    public static Result<TData, TErr> Error<TData, TErr>(TErr error) => new(false, default, error);

    public static Result<TData> Ok<TData>(TData data) => new(true, data, default);

    public static Result<TData> Error<TData>(string errorMessage) => new(false, default, errorMessage);

    public static Result Ok() => new (true, default);

    public static Result Fail(string errorMessage) => new (false, errorMessage);
}