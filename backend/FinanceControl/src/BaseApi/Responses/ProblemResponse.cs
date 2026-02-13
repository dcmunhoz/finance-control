namespace BaseApi.Responses;

public class ProblemResponse
{
    public string Summary { get; set; }
    public string Message { get; set; }
    public int Status { get; set; }
    public ProblemDetailResponse[] Details { get; set; }

}

public class ProblemDetailResponse
{
    public string Summary { get; set; }
    public string Message { get; set; }
}