using ManagerApi.Models;
using ManagerApi.Services;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

// Add CORS services
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // Add the React app's origin
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Add MongoDB settings
builder.Services.Configure<MongoDBSettings>(
    builder.Configuration.GetSection("MongoDBSettings"));

// Register GroceryItemService (scope it to the lifetime of requests)
builder.Services.AddScoped<GroceryItemService>();

// Add controllers
builder.Services.AddControllers();

var app = builder.Build();

app.UseHttpsRedirection();

// Enable CORS
app.UseCors("AllowReactApp");

app.UseAuthorization();

app.MapControllers();

app.Run();
