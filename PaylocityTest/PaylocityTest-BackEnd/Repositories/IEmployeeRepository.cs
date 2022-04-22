using PaylocityTest_BackEnd.Models;

namespace PaylocityTest_BackEnd.Repositories
{
    public interface IEmployeeRepository
    {
        /// <summary>
        /// Get employee with dependents by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<Employee?> GetEmployee(int id);


        Task<IEnumerable<Employee?>> GetAllEmployees(bool includeDependents);

        Task<bool> AddEmployee(Employee employee);

        Task<bool> UpdateEmployee(Employee employee);


        Task<bool> DeleteDependent(int employeeId, int dependentId);
    }
}
