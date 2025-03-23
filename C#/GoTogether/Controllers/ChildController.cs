using Microsoft.AspNetCore.Mvc;
using Repository.Entities;
using Service.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GoTogether.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChildController : ControllerBase
    {
        private readonly IService<Child, string> _service;
        public ChildController(IService<Child, string> service)
        {
            _service = service;
        }

        // GET: api/<ChildController>
        [HttpGet]
        public async Task<List<Child>> Get()
        {
            return await _service.GetAll();
        }

        // GET api/<ChildController>/5
        [HttpGet("{id}")]
        public async Task<Child> Get(string id)
        {
            return await _service.Get(id);
        }

        // POST api/<ChildController>
        [HttpPost]
        public async Task<Child> Post([FromBody] Child value)
        {
            return await _service.Add(value);
        }

        // PUT api/<ChildController>/5
        [HttpPut("{id}")]
        public async Task<Child> Put(string id, [FromBody] Child value)
        {
            return await _service.Update(id, value);
        }

        // DELETE api/<ChildController>/5
        [HttpDelete("{id}")]
        public async Task Delete(string id)
        {
            await _service.Delete(id);
        }
    }
}
