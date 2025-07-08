using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductService.Domain.Entities
{
    public class Product
    {
        public Guid Id { get; set; }
        public string SKU { get; set; } = string.Empty; 
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public bool isAvailable { get; set; }

        public int CategoryId { get; set; }                // FK
        public Category Category { get; set; } = null!;    // Navigation

        public string? ImageUrl { get; set; }

        public bool IsDeleted { get; set; } = false;
    }

}
