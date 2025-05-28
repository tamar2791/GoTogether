using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repository.Entities;
using Service.Interfaces;
using System.Data;

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
        [Authorize(Roles = "admin,parent")]
        [HttpGet]
        public async Task<List<Child>> Get()
        {
            return await _service.GetAll();
        }

        // GET api/<ChildController>/5
        [Authorize(Roles = "admin,parent")]
        [HttpGet("{id}")]
        public async Task<Child> Get(string id)
        {
            return await _service.Get(id);
        }

        // POST api/<ChildController>
        [Authorize(Roles = "parent")]
        [HttpPost]
        public async Task<Child> Post([FromBody] Child value)
        {
            return await _service.Add(value);
        }

        // PUT api/<ChildController>/5
        [Authorize(Roles = "parent,admin")]
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
