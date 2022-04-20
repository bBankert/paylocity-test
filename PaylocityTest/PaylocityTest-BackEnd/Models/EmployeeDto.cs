namespace PaylocityTest_BackEnd.Models
{
    public class EmployeeDto
    {
        public int EmployeeId { get; set; }

        public string Name { get; set; }


        public List<DependentDto> Dependents { get; set; } = new List<DependentDto>();
    }
}
