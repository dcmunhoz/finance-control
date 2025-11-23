namespace BaseApi.Responses;

public class ProblemResponse
{
    public string Name { get; set; }
    public string Message { get; set; }
    public int Status { get; set; }
    public ProblemDetailResponse[] Details { get; set; }

}

public class ProblemDetailResponse
{
    public string Name { get; set; }
    public string Message { get; set; }
}