//------------------------------------------------------------------------------
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
    using System.Collections.Generic;
    
    public partial class Races
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Date { get; set; }
        public string Place { get; set; }
        public string Type { get; set; }
        public string Category { get; set; }
        public string CategoryFull { get; set; }
        public string Url { get; set; }
        public string Tags { get; set; }
        public string Lng { get; set; }
        public string Lat { get; set; }
        public System.Guid Id { get; set; }
        public Nullable<System.Guid> RaceId { get; set; }
        public Nullable<System.Guid> TypeId { get; set; }
    }
}
