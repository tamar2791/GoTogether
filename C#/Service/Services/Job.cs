using Quartz;
using Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class Job : IJob
    {
        private readonly IAlgorithm _algorithm;

        public Job(IAlgorithm algorithm)
        {
            this._algorithm = algorithm;
        }

        public Job()
        {

        }

        public Task Execute(IJobExecutionContext context) 
        {

            _algorithm.SetIsCome();

            return Task.CompletedTask;

        }
    }
}
