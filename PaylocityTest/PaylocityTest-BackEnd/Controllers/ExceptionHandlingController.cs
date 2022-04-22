using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace PaylocityTest_BackEnd.Controllers
{
    [ApiController]
    public class ExceptionHandlingController : Controller
    {
        [Route("error")]
        [ApiExplorerSettings(IgnoreApi = true)]
        public IActionResult HandleErrors()
        {
            var handler = HttpContext.Features.Get<IExceptionHandlerPathFeature>();

            if (handler == null || handler.Error == null)
            {
                return NotFound();
            }

            // Do something with the error

            return Problem();
        }

    }
}
