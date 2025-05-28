using GoTogether.Models;
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
    public class ParentController : ControllerBase
    {
        private readonly IService<Parents, int> _service;
        public ParentController(IService<Parents, int> service)
        {
            _service = service;
        }

        // GET: api/<ManagerController>
        [Authorize(Roles = "admin")]
        [HttpGet]
        public async Task<List<Parents>> Get()
        {
            return await _service.GetAll();
        }

        // GET api/<ManagerController>/5
        [HttpGet("{id}")]
        public async Task<Parents> Get(int id)
        {
            return await _service.Get(id);
        }

        // POST api/<ManagerController>
        [HttpPost]
        public async Task<Parents> Post([FromBody] Parents value)
        {
            return await _service.Add(value);
        }

        // PUT api/<ManagerController>/5
        [Authorize(Roles = "parent")]
        [HttpPut("{id}")]
        public async Task<Parents> Put(int id, [FromBody] Parents value)
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
