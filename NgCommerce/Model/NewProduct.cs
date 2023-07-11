namespace NgCommerce.Model;

public record NewProduct(string Name, decimal Price)    
{
    public string? CoverImageUrl { get; set; }

    public string? Description { get; set; }

    public string? Category { get; set; } // TODO turn to multiple
}