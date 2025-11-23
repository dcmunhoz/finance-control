using BaseApi.Responses;
using Microsoft.AspNetCore.Mvc;
using Results;

namespace BaseApi;

public class ApiControllerBase : ControllerBase
{
    protected IActionResult CreateResponseOnGet<T>(Result<T> result)
    {
        if (result.HasError)
        {
            var response = CreateProblemResponse(result);
            return BadRequest(response);
        }
        
        return CreateResponseOnGet(result.Value);
    }

    protected IActionResult CreateResponseOnGet(object? response)
    {
        return response is null ? NotFound() : Ok(response);
    }
    
    protected IActionResult CreateResponseOnPost<T>(Result<T> result)
    {
        if (result.HasError)
        {
            var response = CreateProblemResponse(result);
            return BadRequest(response);
        }
        
        return CreateResponseOnPost(result.Value);
    }

    protected IActionResult CreateResponseOnPost(object? response)
    {
        return response is null ? NoContent() : Ok(response);
    }
    
    protected IActionResult CreateResponseOnCreated<T>(Result<T> result, string location)
    {
        if (result.HasError)
        {
            var response = CreateProblemResponse(result);
            return BadRequest(response);
        }
        
        return CreateResponseOnCreated(result.Value, location);
    }

    protected IActionResult CreateResponseOnCreated(object response, string location)
    {
        return Created(location, response);
    }

    private ProblemResponse CreateProblemResponse<T>(Result<T> result)
        => new ProblemResponse
        {
            Name = "Ocorreram um ou mais erros ao processar sua requisição.",
            Message = result.Errors.Count > 1 ? string.Empty : result.Errors.First().Message,
            Details = result.Errors.Count > 1
                ? result.Errors.Select(s => new ProblemDetailResponse
                {
                    Name = s.Message
                }).ToArray() : []
        };
}