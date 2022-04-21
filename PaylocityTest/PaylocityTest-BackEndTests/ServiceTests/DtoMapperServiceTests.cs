using Microsoft.VisualStudio.TestTools.UnitTesting;
using PaylocityTest_BackEnd.Models;
using PaylocityTest_BackEnd.Services;
using System.Collections.Generic;

namespace PaylocityTest_BackEndTests.ServiceTests
{
    [TestClass]
    public class DtoMapperServiceTests
    {
        private DtoMapperService? _service;

        [TestInitialize]
        public void Setup()
        {
            _service = new DtoMapperService();
        }

        [TestCleanup]
        public void Cleanup()
        {
            _service = null;
        }

        [TestMethod]
        public void MapDependentDto_WhenGivenADependentDto_ReturnsADependentEntity()
        {
            var depedentDto = new DependentDto
            {
                Name = "Tommy",
                Type = PersonType.Child
            };
            var result = _service.MapDependentDto(depedentDto);

            Assert.AreEqual(depedentDto.Name,result.Name);
            Assert.AreEqual(depedentDto.Type,result.Type);
        }


        [TestMethod]
        public void MapEmployeeDto_WhenGivenAnEmployeeDto_ReturnsAnEmployeeEntity()
        {
            var employeeDto = new EmployeeDto
            {
                Name = "Tommy",
                Dependents = new List<DependentDto>
                {
                    new DependentDto
                    {
                        Name = "Tommy",
                        Type = PersonType.Child
                    }
                },
            };
            var result = _service.MapEmployeeDto(employeeDto);

            Assert.AreEqual(employeeDto.Name, result.Name);
            Assert.AreEqual(PersonType.Employee, result.Type);
            Assert.AreEqual(1,result.Dependents.Count);
        }
    }
}
