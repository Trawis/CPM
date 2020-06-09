using AutoMapper;
using CPM.Infrastructure.Domain;
using CPM.Model;
using CPM.Repository;
using CPM.Service;
using CPM.Service.Mapping;
using CPM.WebApi.Configurations;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
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

            services.AddDbContext<CPMContext>(options => { options.UseSqlite(Configuration.GetConnectionString("CPMConnectionString")); });

            services.AddTransient<IUnitOfWork, UnitOfWork>();
            services.AddTransient<ICarRepository, CarRepository>();
            services.AddTransient<IEmployeeRepository, EmployeeRepository>();
            services.AddTransient<ITravelPlanRepository, TravelPlanRepository>();
            services.AddTransient<ITravelPlanEmployeeRepository, TravelPlanEmployeeRepository>();

            services.AddTransient<ICarService, CarService>();
            services.AddTransient<IEmployeeService, EmployeeService>();
            services.AddTransient<ITravelPlanService, TravelPlanService>();

            services.AddAutoMapper(typeof(CarProfile));
            services.AddAutoMapper(typeof(EmployeeProfile));
            services.AddAutoMapper(typeof(TravelPlanProfile));

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseCors("AllowAll");

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseMiddleware<ExceptionMiddleware>();
            app.UseMvc();
        }
    }
}
