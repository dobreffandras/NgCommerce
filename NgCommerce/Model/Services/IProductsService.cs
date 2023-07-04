namespace NgCommerce.Model.Services;

public interface IProductsService
{
    Task<IEnumerable<Product>> GetProducts();
}
