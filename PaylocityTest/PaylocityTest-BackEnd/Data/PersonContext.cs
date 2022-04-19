using Microsoft.EntityFrameworkCore;
using PaylocityTest_BackEnd.Models;

namespace PaylocityTest_BackEnd.Data
{
    public class PersonContext : DbContext
    {
        public PersonContext(DbContextOptions<PersonContext> options) : base(options)
        { }

        public DbSet<Dependent> Dependents { get; set; }
        public DbSet<Employee> Employees { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Model one-to-many relationship
            modelBuilder.Entity<Employee>()
                .HasMany<Dependent>(employee => employee.Dependents)
                .WithOne(dependent => dependent.Employee)
                .HasForeignKey(employee => employee.Id)
                .OnDelete(DeleteBehavior.ClientCascade);
        }
    }
}
