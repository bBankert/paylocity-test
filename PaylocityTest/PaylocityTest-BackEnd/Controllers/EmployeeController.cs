using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PaylocityTest_BackEnd.Models;
using PaylocityTest_BackEnd.Repositories;
using PaylocityTest_BackEnd.Services;

namespace PaylocityTest_BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IDtoMapperService _dtoMapperService;
        public EmployeeController(IEmployeeRepository employeeRepository,IDtoMapperService dtoMapperService)
        {
            _employeeRepository = employeeRepository;
            _dtoMapperService = dtoMapperService;
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
        public async Task<IActionResult> GetAllEmployees(bool withDependents)
        {
            var employees = await _employeeRepository.GetAllEmployees(withDependents);


            return Ok(employees);
        }


        [HttpPost]
        [Route("addemployee")]
        public async Task<IActionResult> AddEmployee([FromBody] EmployeeDto employeeDto)
        {
            Employee employee = _dtoMapperService.MapEmployeeDto(employeeDto);
            await _employeeRepository.AddEmployee(employee);

            return Ok(employee);
        }

        [HttpPost]
        [Route("{employeeId}/update")]
        public async Task<IActionResult> UpdateEmployee(int employeeId,[FromBody] EmployeeDto employeeDto)
        {
            Employee employee = _dtoMapperService.MapEmployeeDto(employeeDto);
            var result = await _employeeRepository.UpdateEmployee(employeeId,employee);

            return result ? Ok(employee) : Problem();
        }

        [HttpPost]
        [Route("{employeeId}/delete/{dependentId}")]
        public async Task<IActionResult> DeleteDependent(int employeeId,int dependentId)
        {
            var result = await _employeeRepository.DeleteDependent(employeeId,dependentId);

            return result ? Ok() : Problem();
        }

        [HttpPost]
        [Route("{employeeId}/delete")]
        public async Task<IActionResult> DeleteEmployee(int employeeId)
        {
            var result = await _employeeRepository.DeleteEmployee(employeeId);

            return result ? Ok() : Problem();
        }
    }
}
