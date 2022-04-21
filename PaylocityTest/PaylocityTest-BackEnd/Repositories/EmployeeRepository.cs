using Microsoft.EntityFrameworkCore;
using PaylocityTest_BackEnd.Data;
using PaylocityTest_BackEnd.Models;
using System.Linq;

namespace PaylocityTest_BackEnd.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly IDbContextFactory<PersonContext> _contextFactory;

        public EmployeeRepository(IDbContextFactory<PersonContext> contextFactory)
        {
            _contextFactory = contextFactory; ;
        }

        public async Task<bool> AddEmployee(Employee employee)
        {
            using (var context = await _contextFactory.CreateDbContextAsync())
            {

                context.Employees.Add(employee);
                
                context.SaveChanges();

                return true;
            }
        }

        public async Task<bool> UpdateEmployee(Employee employee)
        {
            using(var context = await _contextFactory.CreateDbContextAsync())
            {
                var existingEmployee = context.Employees.Find(employee.Id);
                if(existingEmployee != null)
                {
                    context.Employees.Update(employee);
                    context.SaveChanges();
                    return true;
                }
                return false;
            }
        }

        public async Task<bool> RemoveEmployee(int employeeId)
        {
            using (var context = await _contextFactory.CreateDbContextAsync())
            {
                var employee = context.Employees.Where(employee => employee.Id == employeeId).FirstOrDefault();

                if(employee != null)
                {
                    context.Employees.Remove(employee);

                    context.SaveChanges();
                    return true;
                }
                return false;
            }
        }

        public async Task<IEnumerable<Employee?>> GetAllEmployees(bool includeDependents)
        {
            using (var context = await _contextFactory.CreateDbContextAsync())
            {
                if (includeDependents)
                {
                    return await context.Employees
                        .Include(employee => employee.Dependents)
                        .ToListAsync();
                }
                else
                {
                    return await context.Employees.ToListAsync();
                }
            }
        }

        public async Task<Employee?> GetEmployee(int id)
        {
            using (var context = await _contextFactory.CreateDbContextAsync())
            {
                return await context.Employees
                    .Include(employee => employee.Dependents)
                    .SingleOrDefaultAsync(employee => employee.Id == id);
            }
        }
    }
}
