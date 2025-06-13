using System.ComponentModel.DataAnnotations;

public class CreateCategoryDto
{
    [Required]
    [StringLength(50, MinimumLength = 2)]
    public string Name { get; set; } = string.Empty;

    [StringLength(250)]
    public string? Description { get; set; }
}
