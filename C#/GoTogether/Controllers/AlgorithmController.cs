using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GoTogether.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlgorithmController : ControllerBase
    {
        private readonly IAlgorithm _algorithm;
        public AlgorithmController(IAlgorithm algorithm)
        {
            _algorithm = algorithm;
        }
    }
}
