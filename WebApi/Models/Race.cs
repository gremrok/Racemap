using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class Race
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Descrition { get; set; }
        public DateTime Date { get; set; }
        public string Place { get; set; }
        public decimal Lat { get; set; }
        public decimal Lng { get; set; }
        public Guid RaceTypeId { get; set; }
        public RaceType RaceType { get; set; }
    }
}
