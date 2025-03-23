using Microsoft.AspNetCore.Mvc;
using Repository.Entities;
using Service.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GoTogether.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EducationalInstitutionController : ControllerBase
    {
        private readonly IService<EducationalInstitution, int> _service;
        public EducationalInstitutionController(IService<EducationalInstitution, int> service)
        {
            _service = service;
        }

        // GET: api/<EducationalInstitutionController>
        [HttpGet]
        public async Task<List<EducationalInstitution>> Get()
        {
            return await _service.GetAll();
        }

        // GET api/<EducationalInstitutionController>/5
        [HttpGet("{id}")]
        public async Task<EducationalInstitution> Get(int id)
        {
            return await _service.Get(id);
        }

        // POST api/<EducationalInstitutionController>
        [HttpPost]
        public async Task<EducationalInstitution> Post([FromBody] EducationalInstitution value)
        {
            return await _service.Add(value);
        }

        // PUT api/<EducationalInstitutionController>/5
        [HttpPut("{id}")]
        public async Task<EducationalInstitution> Put(int id, [FromBody] EducationalInstitution value)
        {
            return await _service.Update(id, value);
        }

        // DELETE api/<EducationalInstitutionController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _service.Delete(id);
        }
    }
}
