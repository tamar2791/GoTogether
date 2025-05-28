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
    public class DriverController : ControllerBase
    {
        private readonly IService<Driver, int> _service;
        private readonly IService<Parents, int> _serviceP;
        private readonly IAlgorithm _algorithm;
        public DriverController(IService<Driver, int> service, IAlgorithm algorithm, IService<Parents, int> serviceP)
        {
            _service = service;
            _algorithm = algorithm;
            _serviceP = serviceP;
        }

        // GET: api/<DriverController>
        [Authorize(Roles = "admin,driver")]
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
        [Authorize(Roles = "admin")]
        [HttpPost]
        public async Task<Driver> Post([FromBody] Driver value)
        {
            return await _service.Add(value);
        }


        // PUT api/<DriverController>/5
        [Authorize(Roles = "driver,admin")]
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
        [HttpPost("messege")]
        public async Task Get([FromBody]List<Messese> messeges)
        {
            foreach (Messese p in messeges)
            {
                _algorithm.SendMessege(p.Number, p.Id,p.Messege);
            }
        }
    }
}
