using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Serialization;

namespace WebApp.Models
{
    [Serializable]
    [DataContract]
    public class Race
    {
        [DataMember]
        public int Id { get; set; }
        [DataMember]
        public string Name { get; set; }
        [DataMember]
        public string StartDate { get; set; }
        [DataMember]
        public string EndDate { get; set; }
        [DataMember]
        public string Distances { get; set; }
        [DataMember]
        public List<string> Emails { get; set; }
        [DataMember]
        public List<string> Sites { get; set; }
        [DataMember]
        public string Info { get; set; }
        [DataMember]
        public string Place { get; set; }
        [DataMember]
        public double Lat { get; set; }
        [DataMember]
        public double Lng { get; set; }
    }

}