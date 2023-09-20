using Infrastructure.Services;
using Persistence.ServiceExtensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRepoServices();
builder.Services.AddDbContextService();
builder.Services.AddHttpContextAccessor();
builder.Services.AddHostedService<BTCService>();

AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
