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


        Task<bool> UpdateDependent(int employeeId,int dependentId,Dependent dependent);

        Task<bool> UpdateEmployee(int employeeId,Employee employee);


        Task<bool> DeleteDependent(int employeeId, int dependentId);

        Task<bool> DeleteEmployee(int employeeId);
    }
}
