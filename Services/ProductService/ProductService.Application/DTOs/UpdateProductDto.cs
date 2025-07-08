using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

public class UpdateProductDto
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

    [Required]
    public bool isAvailable { get; set; }

    [Required]
    public int CategoryId { get; set; }

    public IFormFile? Image { get; set; }  // optional if supporting image update
}
