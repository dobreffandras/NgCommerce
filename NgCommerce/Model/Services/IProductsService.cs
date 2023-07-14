namespace NgCommerce.Model.Services;

public interface IProductsService
{
    Task<Result<Product>> CreateProduct(NewProduct product);
    Task<Result<Product>> GetProduct(int id);
    Task<IEnumerable<Product>> GetProducts();
    Task<Result> UpdateProduct(Product product);
    Task<Result> DeleteProduct(int id);
}