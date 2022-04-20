namespace PaylocityTest_BackEnd.Models
{
    public class Employee : Person
    {
        public override PersonType Type => PersonType.Employee;
        public List<Dependent> Dependents { get; set; }
    }
}
