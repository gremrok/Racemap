﻿//------------------------------------------------------------------------------
// <auto-generated>
//     Этот код создан по шаблону.
//
//     Изменения, вносимые в этот файл вручную, могут привести к непредвиденной работе приложения.
//     Изменения, вносимые в этот файл вручную, будут перезаписаны при повторном создании кода.
// </auto-generated>
//------------------------------------------------------------------------------

namespace App
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class RacemapDbContext : DbContext
    {
        public RacemapDbContext()
            : base("name=RacemapDbContext")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<ChildRaces> ChildRaces { get; set; }
        public virtual DbSet<Races> Races { get; set; }
        public virtual DbSet<RaceSerias> RaceSerias { get; set; }
        public virtual DbSet<RaceTags> RaceTags { get; set; }
        public virtual DbSet<RaceTypes> RaceTypes { get; set; }
        public virtual DbSet<Tags> Tags { get; set; }
    }
}