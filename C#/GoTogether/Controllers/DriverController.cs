using Microsoft.AspNetCore.Mvc;
using Repository.Entities;
using Service.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GoTogether.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DriverController : ControllerBase
    {
        private readonly IService<Driver, int> _service;
        public DriverController(IService<Driver, int> service)
        {
            _service = service;
        }

        // GET: api/<DriverController>
        [HttpGet]
        public async Task<List<Driver>> Get()
        {
            return await _service.GetAll();
        }

        // GET api/<DriverController>/5
        [HttpGet("{id}")]
        public async Task<Driver> Get(int id)
        {
            return await _service.Get(id);
        }

        // POST api/<DriverController>
        [HttpPost]
        public async Task<Driver> Post([FromBody] Driver value)
        {
            return await _service.Add(value);
        }

        // PUT api/<DriverController>/5
        [HttpPut("{id}")]
        public async Task<Driver> Put(int id, [FromBody] Driver value)
        {
            return await _service.Update(id, value);
        }

        // DELETE api/<DriverController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _service.Delete(id);
        }
    }
}
