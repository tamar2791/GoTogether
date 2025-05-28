using GoTogether.Models;
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
        [HttpPost("login")]
        public async Task<string> post([FromBody] Login userlogin)
        {
            return await _algorithm.LogIn(userlogin.Email, userlogin.Password);
        }
        [HttpGet("voice-message")]
        public IActionResult VoiceMessage(string message)
        {
            var response = new Twilio.TwiML.VoiceResponse();
            response.Say(message, voice: Twilio.TwiML.Voice.Say.VoiceEnum.Alice, language: "he-IL");

            return Content(response.ToString(), "application/xml"); 
        }
        [HttpPost("(messege)")]
        public async Task post([FromBody]Messese m)
        {
            await _algorithm.SendMessege(m.Number, m.Id,m.Messege);
        }
    }

}
