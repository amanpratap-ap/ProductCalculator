using ProductCalculator.Application;
using ProductCalculator.Services;

namespace ProductCalculator;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        // Services
        builder.Services.AddSingleton<HistoryService>();
        builder.Services.AddSingleton<CalculatorService>();

        // Console Menu
        builder.Services.AddSingleton<Menu>();

        // Allow React frontend
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("ReactPolicy", policy =>
            {
                policy
                    .WithOrigins("http://localhost:5173")
                    .AllowAnyHeader()
                    .AllowAnyMethod();
            });
        });

        var app = builder.Build();

        app.UseSwagger();
        app.UseSwaggerUI();

        // Allow React to call the API
        app.UseCors("ReactPolicy");

        app.MapControllers();

        // Start Console Menu
        var menu = app.Services.GetRequiredService<Menu>();

        Task.Run(() => menu.Run());

        // Start Web API
        app.Run();
    }
}