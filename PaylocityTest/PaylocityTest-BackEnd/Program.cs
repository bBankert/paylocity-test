using Microsoft.EntityFrameworkCore;
using PaylocityTest_BackEnd.Data;
using PaylocityTest_BackEnd.Repositories;
using PaylocityTest_BackEnd.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



//Just using in memory db for time purposes
builder.Services.AddPooledDbContextFactory<PersonContext>(options =>
    options.UseInMemoryDatabase("Employee")
);

builder.Services.AddTransient<IDtoMapperService, DtoMapperService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "AllowAll",
                      policy =>
                      {
                          policy.AllowAnyOrigin();
                          policy.WithMethods();
                          policy.AllowAnyHeader();
                      });
});

builder.Services.AddTransient<IEmployeeRepository, EmployeeRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseExceptionHandler("/error");
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors("AllowAll");

app.Run();
