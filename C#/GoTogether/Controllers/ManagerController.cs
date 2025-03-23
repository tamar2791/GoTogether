using Microsoft.AspNetCore.Mvc;
using Repository.Entities;
using Service.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GoTogether.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManagerController : ControllerBase
    {
        private readonly IService<Manager, int> _service;
        public ManagerController(IService<Manager, int> service)
        {
            _service = service;
        }

        // GET: api/<ManagerController>
        [HttpGet]
        public async Task<List<Manager>> Get()
        {
            return await _service.GetAll();
        }

        // GET api/<ManagerController>/5
        [HttpGet("{id}")]
        public async Task<Manager> Get(int id)
        {
            return await _service.Get(id);
        }

        // POST api/<ManagerController>
        [HttpPost]
        public async Task<Manager> Post([FromBody] Manager value)
        {
            return await _service.Add(value);
        }

        // PUT api/<ManagerController>/5
        [HttpPut("{id}")]
        public async Task<Manager> Put(int id, [FromBody] Manager value)
        {
            return await _service.Update(id, value);
        }

        // DELETE api/<ManagerController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _service.Delete(id);
        }
    }
}
