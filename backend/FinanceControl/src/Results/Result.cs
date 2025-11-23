namespace Results;

public class Result<TResult>
{
    private IList<ResultError> _errors;
    
    public bool IsSuccess { get; set; }
    public bool HasError { get; set; }
    public IReadOnlyCollection<ResultError> Errors => _errors.ToArray();
    public TResult? Value { get; set; }
    
    internal Result()
    {
        _errors = new List<ResultError>();
    }
    
    public void AddError(ResultError error) => _errors.Add(error);
    
    public static implicit operator Result<TResult>(TResult value) => Results.Ok(value);
    public static implicit operator Result<TResult>(string error) => Results.Error<TResult>(error);
    public static implicit operator Result<TResult>(ResultError error) => Results.Error<TResult>(error);
}

public static class Results
{
    public static Result<TResult> Ok<TResult>(TResult value)
    {
        var result = new Result<TResult>() { IsSuccess = true, HasError = false};
        result.Value = value;
        return result;
    }

    public static Result<TResult> Error<TResult>(ResultError error)
    {
        var result = new Result<TResult>() { IsSuccess = false, HasError = true };
        result.AddError(error);
        return result;
    }

    public static Result<TResult> Error<TResult>(string message) => Error<TResult>(new ResultError(message));
}