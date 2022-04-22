using PaylocityTest_BackEnd.Models;

namespace PaylocityTest_BackEnd.Services
{
    public interface IDtoMapperService
    {
        Employee MapEmployeeDto(EmployeeDto employeeDto);

        Dependent MapDependentDto(DependentDto dependentDto);
    }
}
