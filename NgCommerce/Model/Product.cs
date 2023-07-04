namespace NgCommerce.Model;

public record Product(int Id, string Name)
{
    public string? Description { get; set; }

    public string? Category { get; set; } // TODO turn to multiple
};
