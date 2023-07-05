using Microsoft.EntityFrameworkCore;
using NgCommerce.Data;

namespace NgCommerce.Model.Services;

public class ProductsService : IProductsService
{
    private readonly DataContext dataContext;

    public ProductsService(DataContext dataContext)
    {
        this.dataContext = dataContext;
    }

    public async Task<IEnumerable<Product>> GetProducts()
    {
        var entities = await dataContext.Products.ToListAsync();
        return entities.Select(e => new Product(e.Id, e.Name));
    }
}
