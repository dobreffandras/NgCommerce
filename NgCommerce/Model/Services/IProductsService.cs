namespace NgCommerce.Model.Services;

public interface IProductsService
{
    Task<Result<Product>> CreateProduct(NewProduct product);

    Task<IEnumerable<Product>> GetProducts();
}