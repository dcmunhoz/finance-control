FROM mcr.microsoft.com/dotnet/aspnet:10.0.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build

ARG BUILD_MODE=Release

WORKDIR src

COPY Directory.Build.props .
COPY Directory.Packages.props .
COPY src/Results/Results.csproj Results/Results.csproj
COPY src/BaseApi/BaseApi.csproj  BaseApi/BaseApi.csproj
COPY src/FC.Domain/FC.Domain.csproj FC.Domain/FC.Domain.csproj
COPY src/Security/Security.csproj Security/Security.csproj
COPY src/Identity.Application/Identity.Application.csproj Identity.Application/Identity.Application.csproj
COPY src/Identity.Infra.Data/Identity.Infra.Data.csproj Identity.Infra.Data/Identity.Infra.Data.csproj
COPY src/Identity.Api/Identity.Api.csproj Identity.Api/Identity.Api.csproj

RUN dotnet restore Identity.Api/Identity.Api.csproj

COPY src/ .

RUN dotnet build Identity.Api/Identity.Api.csproj -c Release -o /out

FROM build AS publish
RUN dotnet publish Identity.Api/Identity.Api.csproj -c Release -o /out/publish

FROM base
WORKDIR .
COPY --from=publish /out/publish .

ENTRYPOINT ["dotnet", "Identity.Api.dll"]
