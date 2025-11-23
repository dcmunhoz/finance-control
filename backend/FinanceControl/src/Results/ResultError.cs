namespace Results;

public class ResultError
{
    public string Message { get; set; }

    public ResultError(string message)
    {
        Message = message;
    }
}