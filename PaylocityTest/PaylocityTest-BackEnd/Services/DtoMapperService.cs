using PaylocityTest_BackEnd.Models;

namespace PaylocityTest_BackEnd.Services
{
    public class DtoMapperService : IDtoMapperService
    {
        public Dependent MapDependentDto(DependentDto dependentDto)
        {
            return new Dependent
            {
                EmployeeId = dependentDto.EmployeeId,
                Name = dependentDto.Name,
                Type = dependentDto.Type,
            };
        }

        public Employee MapEmployeeDto(EmployeeDto employeeDto)
        {
            List<Dependent> dependents = employeeDto.Dependents.Select(depedent => new Dependent
            {
                Name = depedent.Name,
                Type = depedent.Type,
            }).ToList();

            return new Employee
            {
                Name = employeeDto.Name,
                Dependents = dependents
            };
        }
    }
}
