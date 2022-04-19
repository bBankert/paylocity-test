using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PaylocityTest_BackEnd.Models;
using PaylocityTest_BackEnd.Repositories;

namespace PaylocityTest_BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeRepository _employeeRepository;
        public EmployeeController(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetEmployee(int id)
        {
            var employee = await _employeeRepository.GetEmployee(id);

            return employee == null ? NotFound() : Ok(employee);
        }

        /// <summary>
        /// Public endpoint to list all employees on a dashboard
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetAllEmployees()
        {
            var employees = await _employeeRepository.GetAllEmployees(false);


            return Ok(employees);
        }


        [HttpPost]
        [Route("addemployee")]
        public async Task<IActionResult> AddEmployee([FromBody] Employee employee)
        {
            await _employeeRepository.AddEmployee(employee);

            return Ok(employee);
        }

        [HttpPost]
        [Route("{employeeId}/adddependent")]
        public async Task<IActionResult> AddDependent(int employeeId,[FromBody] Dependent dependent)
        {
            await _employeeRepository.AddDependent(employeeId, dependent);

            return Ok(dependent);
        }

        [HttpPost]
        [Route("{employeeId}/removedependent/{id}")]
        public async Task<IActionResult> RemoveDependent(int employeeId,int dependentId)
        {
            await _employeeRepository.RemoveDependent(employeeId, dependentId);

            return Ok();
        }
    }
}
