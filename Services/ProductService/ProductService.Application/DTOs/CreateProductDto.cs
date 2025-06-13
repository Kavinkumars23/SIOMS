using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductService.Application.DTOs
{
    public class CreateProductDto
    {
        [Required]
        [StringLength(20, MinimumLength = 3)]
        public string SKU { get; set; } = string.Empty;

        [Required]
        [StringLength(100, MinimumLength = 3)]
        public string Name { get; set; } = string.Empty;

        [StringLength(500)]
        public string? Description { get; set; }

        [Range(0.01, 999999.99)]
        public decimal Price { get; set; }

        [Range(0, 100000)]
        public int Quantity { get; set; }

        [Required]
        public int CategoryId { get; set; }

        public IFormFile? Image { get; set; }
    }



}
