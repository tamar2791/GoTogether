using Microsoft.AspNetCore.Mvc;
using Repository.Entities;
using Service.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GoTogether.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChaperoneController : ControllerBase
    {
        private readonly IService<Chaperone, string> _service;
        public ChaperoneController(IService<Chaperone, string> service)
        {
            _service = service;
        }
        // GET: api/<ChaperoneController>
        [HttpGet]
        public async Task<List<Chaperone>> Get()
        {
            return await _service.GetAll();
        }

        // GET api/<ChaperoneController>/5
        [HttpGet("{id}")]
        public async Task<Chaperone> Get(string id)
        {
            return await _service.Get(id);
        }

        // POST api/<ChaperoneController>
        [HttpPost]
        public async Task<Chaperone> Post([FromBody] Chaperone value)
        {
            return await _service.Add(value);

        }

        // PUT api/<ChaperoneController>/5
        [HttpPut("{id}")]
        public async Task<Chaperone> Put(string id, [FromBody] Chaperone value)
        {
            return await _service.Update(id,value);

        }

        // DELETE api/<ChaperoneController>/5
        [HttpDelete("{id}")]
        public async Task Delete(string id)
        {
            await _service.Delete(id);

        }
    }
}
