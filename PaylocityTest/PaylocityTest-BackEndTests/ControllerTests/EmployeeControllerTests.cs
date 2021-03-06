using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using PaylocityTest_BackEnd.Controllers;
using PaylocityTest_BackEnd.Models;
using PaylocityTest_BackEnd.Repositories;
using PaylocityTest_BackEnd.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace PaylocityTest_BackEndTests.ControllerTests
{
    [TestClass]
    public class EmployeeControllerTests
    {
        private Mock<IEmployeeRepository>? _mockEmployeeRepository;
        private Mock<IDtoMapperService>? _mockMapperService;
        private EmployeeController? _controller;
        private Employee _testEmployee = new Employee
        {
            Id = 1,
            Name = "tom",
            Type = PersonType.Employee
        };

        private Dependent _testDependent = new Dependent
        {
            Id = 1,
            Name = "tom",
            Type = PersonType.Child,
            EmployeeId = 1
        };
        [TestInitialize]
        public void Setup()
        {
            _mockEmployeeRepository = new Mock<IEmployeeRepository>();
            _mockMapperService = new Mock<IDtoMapperService>();
            _controller = new EmployeeController(_mockEmployeeRepository.Object, _mockMapperService.Object);
        }

        [TestCleanup]
        public void Cleanup()
        {
            _mockMapperService = null;
            _controller = null;
            _mockEmployeeRepository = null;
        }


        [TestMethod]
        public async Task GetEmployee_WhenAnEmployeeIsFoundByTheIdGiven_ReturnsOkWithTheEmployee()
        {
            _mockEmployeeRepository.Setup(repository => repository.GetEmployee(It.IsAny<int>())).ReturnsAsync(_testEmployee);

            var response = await _controller.GetEmployee(1) as ObjectResult;
            Employee employee = response.Value as Employee;

            Assert.AreEqual((int)HttpStatusCode.OK, response.StatusCode);
            Assert.AreEqual(_testEmployee.Name, employee.Name);
        }

        [TestMethod]
        public async Task GetEmployee_WhenAnEmployeeIsNotFoundWithTheIdGiven_ReturnsNotFound()
        {

            var response = await _controller.GetEmployee(1) as NotFoundResult;

            Assert.AreEqual((int)HttpStatusCode.NotFound, response.StatusCode);
        }

        [TestMethod]
        public async Task GetAllEmployees_WhenCalled_ReturnsAllEmployeesInTheDatabase()
        {
            _mockEmployeeRepository.Setup(repository => repository.GetAllEmployees(It.IsAny<bool>())).ReturnsAsync(new List<Employee>
            {
                _testEmployee
            });
            var response = await _controller.GetAllEmployees(false) as ObjectResult;
            List<Employee> employees = response.Value as List<Employee>;


            Assert.AreEqual((int)HttpStatusCode.OK, response.StatusCode);
            Assert.AreEqual(1, employees.Count);
            Assert.AreEqual(_testEmployee.Id, employees[0].Id);
        }

        [TestMethod]
        public async Task AddEmployee_WhenCalled_AddsTheEmployeeToTheDatabase()
        {
            _mockMapperService.Setup(mapperService => mapperService.MapEmployeeDto(It.IsAny<EmployeeDto>())).Returns(_testEmployee);
            var response = await _controller.AddEmployee(new EmployeeDto
            {
                Name = "tom",
                EmployeeId = 1,
            }) as ObjectResult;
            Employee employee = response.Value as Employee;
            _mockEmployeeRepository.Verify(repository => repository.AddEmployee(It.IsAny<Employee>()), Times.Once);
            Assert.AreEqual((int)HttpStatusCode.OK, response.StatusCode);
            Assert.AreEqual(_testEmployee.Id,employee.Id);
        }

        [TestMethod]
        public async Task UpdateEmployee_WhenCalled_UpdatesTheEmployeeInTheDatabase()
        {
            _mockMapperService.Setup(mapperService => mapperService.MapEmployeeDto(It.IsAny<EmployeeDto>())).Returns(_testEmployee);
            _mockEmployeeRepository.Setup(repository => repository.UpdateEmployee(It.IsAny<int>(),It.IsAny<Employee>())).ReturnsAsync(true);
            var response = await _controller.UpdateEmployee(1,new EmployeeDto
            {
                Name = "tom",
                EmployeeId = 1,
            }) as ObjectResult;
            Employee employee = response.Value as Employee;
            _mockEmployeeRepository.Verify(repository => repository.UpdateEmployee(It.IsAny<int>(),It.IsAny<Employee>()), Times.Once);
            Assert.AreEqual((int)HttpStatusCode.OK, response.StatusCode);
            Assert.AreEqual(_testEmployee.Id, employee.Id);
        }

        [TestMethod]
        public async Task UpdateEmployee_WhenTheEmployeeIsNotFound_DoesNotUpdateTheEmployee()
        {
            _mockMapperService.Setup(mapperService => mapperService.MapEmployeeDto(It.IsAny<EmployeeDto>())).Returns(_testEmployee);
            _mockEmployeeRepository.Setup(repository => repository.UpdateEmployee(It.IsAny<int>(),It.IsAny<Employee>())).ReturnsAsync(false);
            var response = await _controller.UpdateEmployee(1,new EmployeeDto
            {
                Name = "tom",
                EmployeeId = 1,
            }) as ObjectResult;
            Employee employee = response.Value as Employee;
            Assert.AreEqual((int)HttpStatusCode.InternalServerError, response.StatusCode);
        }

        [TestMethod]
        public async Task DeleteDependent_WhenTheDependentIsFound_DeletesTheDependentAndReturnsOk()
        {
            _mockEmployeeRepository.Setup(repository => repository.DeleteDependent(It.IsAny<int>(), It.IsAny<int>())).ReturnsAsync(true);
            var response = await _controller.DeleteDependent(1, 1) as OkResult;
            Assert.AreEqual((int)HttpStatusCode.OK, response.StatusCode);
        }

        [TestMethod]
        public async Task DeleteDependent_WhenTheDependentIsNotFound_DoesNothingAndReturnsInternalServerError()
        {
            _mockEmployeeRepository.Setup(repository => repository.DeleteDependent(It.IsAny<int>(), It.IsAny<int>())).ReturnsAsync(false);
            var response = await _controller.DeleteDependent(1, 1) as ObjectResult;
            Assert.AreEqual((int)HttpStatusCode.InternalServerError, response.StatusCode);
        }

        [TestMethod]
        public async Task DeleteEmployee_WhenTheEmployeeIsFound_DeletesTheEmployeeAndReturnsOk()
        {
            _mockEmployeeRepository.Setup(repository => repository.DeleteEmployee(It.IsAny<int>())).ReturnsAsync(true);
            var response = await _controller.DeleteEmployee(1) as OkResult;
            Assert.AreEqual((int)HttpStatusCode.OK, response.StatusCode);
        }

        [TestMethod]
        public async Task DeleteEmployee_WhenTheEmployeeIsNotFound_ReturnsInternalServerError()
        {
            _mockEmployeeRepository.Setup(repository => repository.DeleteDependent(It.IsAny<int>(), It.IsAny<int>())).ReturnsAsync(false);
            var response = await _controller.DeleteDependent(1, 1) as ObjectResult;
            Assert.AreEqual((int)HttpStatusCode.InternalServerError, response.StatusCode);
        }

        [TestMethod]
        public async Task UpdateEmployee_WhenTheEmployeeIsNotFound_DeletesTheEmployeeAndReturnsInternalServerError()
        {
            _mockEmployeeRepository.Setup(repository => repository.UpdateDependent(It.IsAny<int>(), It.IsAny<int>(),It.IsAny<Dependent>())).ReturnsAsync(false);
            _mockMapperService.Setup(service => service.MapDependentDto(It.IsAny<DependentDto>())).Returns(_testDependent);
            var response = await _controller.UpdateDependent(1, 1,new DependentDto
            {
                EmployeeId = 1,
                Name = "tom",
                Id = 1,
                Type = PersonType.Child
            }) as ObjectResult;
            Assert.AreEqual((int)HttpStatusCode.InternalServerError, response.StatusCode);
        }

        [TestMethod]
        public async Task UpdateEmployee_WhenTheEmployeeIsFound_UpdatesTheEmployeeAndReturnsOkWithTheDependent()
        {
            _mockEmployeeRepository.Setup(repository => repository.UpdateDependent(It.IsAny<int>(), It.IsAny<int>(), It.IsAny<Dependent>())).ReturnsAsync(true);
            _mockMapperService.Setup(service => service.MapDependentDto(It.IsAny<DependentDto>())).Returns(_testDependent);
            var response = await _controller.UpdateDependent(1, 1, new DependentDto
            {
                EmployeeId = 1,
                Name = "tom",
                Id = 1,
                Type = PersonType.Child
            }) as ObjectResult;
            Dependent dependent = response.Value as Dependent;
            Assert.AreEqual((int)HttpStatusCode.OK, response.StatusCode);
            Assert.AreEqual(PersonType.Child, dependent.Type);
        }
    }
}
