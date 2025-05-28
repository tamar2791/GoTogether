//using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.OpenApi.Models;
using Mock;
using Repository.Interfaces;
using Service.Interfaces;
using Service.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Quartz;
using Quartz.Impl;
using static Quartz.Logging.OperationName;
using Quartz.Xml.JobSchedulingData20;
using Job = Service.Services.Job;

var builder = WebApplication.CreateBuilder(args);




// Add services to the container.
builder.Services.AddControllers();


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "securityGoTogether", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "Please enter your bearer token",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        }
                    },
                    new string[] {}
                }
            });
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(
    option => option.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(builder.Configuration["Jwt:Key"]))
    }
    );

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
});

var myAllowSpecificOrigin = "_myAllowSpecificOrigin";
builder.Services.AddCors(option =>
{
    option.AddPolicy(name: myAllowSpecificOrigin,
        builder =>
        {
            builder.WithOrigins("http://localhost:7137").AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
});



builder.Services.AddScoped<Job>();
builder.Services.AddScoped<Algorithm>();

builder.Services.AddQuartz(q =>
{

    var jobKey = new JobKey("Job");
    q.AddJob<Job>(opts => opts.WithIdentity(jobKey));

    q.AddTrigger(opts => opts
        .ForJob(jobKey)
        .WithIdentity("ImportJob-trigger")
        .WithCronSchedule("0 0 17 * * ?"));
});
builder.Services.AddQuartzHostedService(q => q.WaitForJobsToComplete = true);

builder.Services.AddServices();
builder.Services.AddDbContext<IContext, DataContext>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(myAllowSpecificOrigin);
app.UseHttpsRedirection();



app.UseAuthentication();
app.UseAuthorization();



app.MapControllers();

app.Run();
