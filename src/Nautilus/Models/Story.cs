using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nautilus.Models
{
    public class Story
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime LastUpdated { get; set; }
        public string Owner { get; set; }
        public string Type { get; set; }
        public string TitleImageUrl { get; set; }
        public string Content { get; set; }
    }
}
