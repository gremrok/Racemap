using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Models;

namespace WebApi.Interfaces
{
    public interface IRaceRepository
    {
        void Add(Race race);
        IEnumerable<Race> GetAll();
        Race Find(string key);
        Race Rempve(Guid id);
        void Update(Race race);
    }
}
