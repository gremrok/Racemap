﻿//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace WebApp
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class racemapEntities : DbContext
    {
        public racemapEntities()
            : base("name=racemapEntities")
        {
        }
    
        //protected override void OnModelCreating(DbModelBuilder modelBuilder)
        //{
        //    throw new UnintentionalCodeFirstException();
        //}
    
        public DbSet<ChildRace> ChildRaces { get; set; }
        public DbSet<RaceHistory> RaceHistories { get; set; }
        public DbSet<Race> Races { get; set; }
        public DbSet<RaceSeria> RaceSerias { get; set; }
        public DbSet<RaceTag> RaceTags { get; set; }
        public DbSet<RaceType> RaceTypes { get; set; }
        public DbSet<Tag> Tags { get; set; }
    }
}
