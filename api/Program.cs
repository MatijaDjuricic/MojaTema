using System.Text;
using api.Data;
using api.Interfaces;
using api.Repositories;
using api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSignalR();
builder.Services.AddSwaggerGen(option => {
    option.SwaggerDoc("v1", new OpenApiInfo { Title = "MojaTema API", Version = "v1" });
    option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter a valid token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "Bearer"
    });
    option.AddSecurityRequirement(new OpenApiSecurityRequirement {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });
});
builder.Services.AddControllers().AddNewtonsoftJson(options => {
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
});
builder.Services.AddDbContext<DataContext>(options => {
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
#pragma warning disable CS8604
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options => {
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
    options.Events = new JwtBearerEvents
    {
        OnMessageReceived = context =>
        {
            var path = context.HttpContext.Request.Path;
            if (path.StartsWithSegments("/socketService")) {
                var accessToken = context.Request.Query["access_token"].FirstOrDefault()
                ?? context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
                if (!string.IsNullOrEmpty(accessToken)) context.Token = accessToken;
                else Console.WriteLine("No access token found.");
            }
            return Task.CompletedTask;
        }
    };
});
#pragma warning restore CS8604
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ITopicRepository, TopicRepository>();
builder.Services.AddScoped<IMessageRepository, MessageRepository>();
var app = builder.Build();
if (app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();
app.UseCors(x => x.AllowAnyMethod().AllowAnyHeader().AllowCredentials().SetIsOriginAllowed(origin => true).WithOrigins("http://localhost:5173"));
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.MapHub<SocketService>("/socketService");
app.Run();