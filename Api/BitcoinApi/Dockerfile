#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
ENV ASPNETCORE_ENVIRONMENT=Development
WORKDIR /src
COPY ["Api/BitcoinApi/BitcoinApi.csproj", "Api/BitcoinApi/"]
COPY ["Infrastructure/Infrastructure/Infrastructure.csproj", "Infrastructure/Infrastructure/"]
COPY ["Core/Application/Application.csproj", "Core/Application/"]
COPY ["Core/Domain/Domain.csproj", "Core/Domain/"]
COPY ["Infrastructure/Persistence/Persistence.csproj", "Infrastructure/Persistence/"]
RUN dotnet restore "Api/BitcoinApi/BitcoinApi.csproj"
COPY . .
WORKDIR "/src/Api/BitcoinApi"
RUN dotnet build "BitcoinApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "BitcoinApi.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BitcoinApi.dll", "--environment=Development"]