using AutoMapper;
using CPM.Infrastructure.Domain;
using CPM.Model;
using CPM.Repository;
using CPM.Service;
using CPM.Service.Mapping;
using CPM.WebApi.Configurations;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CPM.WebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(c => c.AddPolicy("AllowAll", builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            }));

            services.AddControllers().AddNewtonsoftJson();
            services.AddDbContext<CPMContext>(options => { options.UseSqlite(Configuration.GetConnectionString("CPMConnectionString")); });

            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<ICarRepository, CarRepository>();
            services.AddScoped<IEmployeeRepository, EmployeeRepository>();
            services.AddScoped<ITravelPlanRepository, TravelPlanRepository>();
            services.AddScoped<ITravelPlanEmployeeRepository, TravelPlanEmployeeRepository>();

            services.AddScoped<ICarService, CarService>();
            services.AddScoped<IEmployeeService, EmployeeService>();
            services.AddScoped<ITravelPlanService, TravelPlanService>();

            services.AddAutoMapper(typeof(CarProfile));
            services.AddAutoMapper(typeof(EmployeeProfile));
            services.AddAutoMapper(typeof(TravelPlanProfile));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.EnvironmentName == "Development")
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseCors("AllowAll");
            app.UseRouting();
            app.UseMiddleware<ExceptionMiddleware>();
            app.UseEndpoints(endpoints => endpoints.MapControllers());
        }
    }
}
