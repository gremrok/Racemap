//------------------------------------------------------------------------------
// <auto-generated>
//    Этот код был создан из шаблона.
//
//    Изменения, вносимые в этот файл вручную, могут привести к непредвиденной работе приложения.
//    Изменения, вносимые в этот файл вручную, будут перезаписаны при повторном создании кода.
// </auto-generated>
//------------------------------------------------------------------------------

namespace WebApp
{
    using System;
    using System.Collections.Generic;
    
    public partial class RaceDistance
    {
        public System.Guid Id { get; set; }
        public string Name { get; set; }
        public Nullable<decimal> Length { get; set; }
        public Nullable<System.TimeSpan> Duration { get; set; }
        public string Track { get; set; }
        public Nullable<decimal> Price { get; set; }
        public Nullable<System.Guid> RaceId { get; set; }
    }
}