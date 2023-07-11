using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NgCommerce.Data;

public class ProductEntity
{
    public int Id { get; set; }

    [Required]
    public required string Name { get; set; }

    [Required]
    [Column(TypeName = "money")]
    public required decimal Price { get; set; }

    public string? CoverImageUrl { get; set; } 

    public string? Description { get; set; }

    public string? Category { get; set; }
}
