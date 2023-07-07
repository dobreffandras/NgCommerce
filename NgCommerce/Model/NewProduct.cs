namespace NgCommerce.Model;

public record NewProduct(string Name)    
{
    public string? Description { get; set; }

    public string? Category { get; set; } // TODO turn to multiple
}