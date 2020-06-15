using CPM.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CPM.Repository
{
    public class CPMContext : DbContext
    {
        public DbSet<Car> Car { get; set; }
        public DbSet<Employee> Employee { get; set; }
        public DbSet<TravelPlan> TravelPlan { get; set; }
        public DbSet<TravelPlanEmployee> TravelPlanEmployee { get; set; }

        public CPMContext(DbContextOptions<CPMContext> options) : base (options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Car>()
                .HasIndex(c => c.Plates)
                .IsUnique();

            modelBuilder.Entity<TravelPlanEmployee>()
                .HasKey(k => new { k.TravelPlanId, k.EmployeeId });

            modelBuilder.Entity<TravelPlanEmployee>()
                .HasOne(tpe => tpe.TravelPlan)
                .WithMany(tpe => tpe.TravelPlanEmployees)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            foreach (IMutableEntityType entityType in modelBuilder.Model.GetEntityTypes())
            {
                entityType.SetTableName(entityType.DisplayName());
            }
        }
    }
}