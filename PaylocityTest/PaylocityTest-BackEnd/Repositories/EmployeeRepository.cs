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
            var context = await _contextFactory.CreateDbContextAsync();
            context.Employees.Add(employee);
                
            context.SaveChanges();

            return true;
        }

        public async Task<bool> UpdateEmployee(int employeeId,Employee employee)
        {
            var context = await _contextFactory.CreateDbContextAsync();
            var existingEmployee = context.Employees
                .Include(employee => employee.Dependents)
                .Where(existingEmployee => existingEmployee.Id == employeeId)
                .FirstOrDefault();
            if (existingEmployee != null)
            {
                existingEmployee.Name = employee.Name;
                existingEmployee.Dependents = employee.Dependents;
                context.SaveChanges();
                return true;
            }
            return false;
        }

        public async Task<IEnumerable<Employee?>> GetAllEmployees(bool includeDependents)
        {
            var context = await _contextFactory.CreateDbContextAsync();
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

        public async Task<Employee?> GetEmployee(int id)
        {
            var context = await _contextFactory.CreateDbContextAsync();
            return await context.Employees
                    .Include(employee => employee.Dependents)
                    .SingleOrDefaultAsync(employee => employee.Id == id);
        }

        public async Task<bool> DeleteDependent(int employeeId, int dependentId)
        {
            var context = await _contextFactory.CreateDbContextAsync();
            var employee = context.Employees
                .Include(employee => employee.Dependents)
                .Where(employee => employee.Id == employeeId).SingleOrDefault();

            if(employee != null)
            {
                employee.Dependents.RemoveAll(dependent => dependent.Id == dependentId);
                context.SaveChanges();
                return true;
            }
            return false;
        }

        public async Task<bool> DeleteEmployee(int employeeId)
        {
            var context = await _contextFactory.CreateDbContextAsync();
            var employee = context.Employees
                .Where(employee => employee.Id == employeeId).SingleOrDefault();

            if (employee != null)
            {
                context.Employees.Remove(employee);
                context.SaveChanges();
                return true;
            }
            return false;
        }
    }
}
