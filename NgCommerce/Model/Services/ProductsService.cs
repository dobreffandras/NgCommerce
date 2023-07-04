namespace NgCommerce.Model.Services;

public class ProductsService : IProductsService
{
    public async Task<IEnumerable<Product>> GetProducts()
    {
        return new [] { new Product(Id: 1, Name: "Product1") };
    }
}
