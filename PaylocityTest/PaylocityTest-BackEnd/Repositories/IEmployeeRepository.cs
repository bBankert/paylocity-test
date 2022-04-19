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

        Task AddEmployee(Employee employee);

        Task RemoveEmployee(Employee employee);

        Task AddDependent(int employeeId, Dependent dependent);

        Task RemoveDependent(int employeeId, int dependentId);
    }
}
