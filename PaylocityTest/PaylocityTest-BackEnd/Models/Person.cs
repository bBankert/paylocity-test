namespace PaylocityTest_BackEnd.Models
{
    public abstract class Person
    {
        public string Name { get; set; }
        public int Id { get; set; }

        public PersonType Type { get; set; }
    }

    public enum PersonType
    {
        Employee,
        Spouse,
        Child
    }
}
