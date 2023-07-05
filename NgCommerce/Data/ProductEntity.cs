using System.ComponentModel.DataAnnotations;

namespace NgCommerce.Data;

public class ProductEntity
{
    public int Id { get; set; }

    [Required]
    public required string Name { get; set; }

    public string? Description { get; set; }

    public string? Category { get; set; }
}
