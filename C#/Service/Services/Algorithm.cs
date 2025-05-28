using Microsoft.IdentityModel.Tokens;
using Repository.Entities;
using Repository.Interfaces;
using Repository.Repositories;
using Service.Interfaces;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.TwiML.Messaging;
using Twilio.Types;

namespace Service.Services
{
    public class Algorithm : IAlgorithm
    {
        private readonly IRepository<Parents, int> _parentRepository;
        private readonly IRepository<Manager, int> _managerRepository;
        private readonly IRepository<Driver, int> _driverRepository;
        private readonly ChildRepository _childRepository;
        private readonly ILogin<Manager> managerLogin;
        private readonly ILogin<Driver> driverLogin;
        private readonly ILogin<Parents> parentLogin;
        private readonly IService<Parents,int> _serviceParent; 
        public Algorithm(IRepository<Parents, int> parentRepository, IRepository<Manager, int> managerRepository, IRepository<Driver, int> driverRepository, ILogin<Manager> manager, ILogin<Driver> driver, ILogin<Parents> parent,IService<Parents,int>service, ChildRepository childRepository)
        {
            _parentRepository = parentRepository;
            _managerRepository = managerRepository;
            _driverRepository = driverRepository;
            managerLogin = manager;
            driverLogin = driver;
            parentLogin = parent;
            _serviceParent=service;
            _childRepository=childRepository;
        }

        public async Task<string> LogIn(string email, string password)
        {
            Manager m = await managerLogin.Authenticate(email, password);
            Driver d = await driverLogin.Authenticate(email, password);
            Parents p = await parentLogin.Authenticate(email, password);
            if (m != null)
                return managerLogin.Generate(m);
            if (d != null)
                return driverLogin.Generate(d);
            if (p != null)
                return parentLogin.Generate(p);
            return "";
        }

        public Task<string> SignUp(string email, string password)
        {
            throw new NotImplementedException();
        }
        public void VoiceMessege(string number, string messege)
        {
            const string accountSid = "AC403d6b93edde6fd4a09b769f5112b9f7";
            const string authToken = "3f349072811cde429cab206388e84e3f";

            TwilioClient.Init(accountSid, authToken);

            string encodedMessage = Uri.EscapeDataString(messege);
            string serverUrl = "https://localhost:7137/api/Algorithm/voice-message"; 

            var call = CallResource.Create(
                to: new PhoneNumber("+972" + number),
                from: new PhoneNumber("+12014775370"),
                url: new Uri($"{serverUrl}?message={encodedMessage}"));
        }
        public void SMSMessege(string number,string messege)
        {
            const string accountSid = "AC403d6b93edde6fd4a09b769f5112b9f7";
            const string authToken = "3f349072811cde429cab206388e84e3f";

            TwilioClient.Init(accountSid, authToken);

            var message = MessageResource.Create(
                body: messege,
                from: new PhoneNumber("+12014775370"),
                to: new PhoneNumber("+972"+number)
            );
        }
        public async Task SendMessege(string number,int id,string messege)
        {
            Parents p=await _serviceParent.Get(id);
            if (p.IsSms)
                SMSMessege(number,messege);
            else
                VoiceMessege(number,messege);
        }
        public async Task SetIsCome()
        {
            _childRepository.SetIsComeAndIsLeave();
        }

    }
}








