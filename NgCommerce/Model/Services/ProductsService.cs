using AutoMapper;
using Microsoft.EntityFrameworkCore;
using NgCommerce.Data;

namespace NgCommerce.Model.Services;

public class ProductsService : IProductsService
{
    private readonly DataContext dataContext;
    private readonly IMapper mapper;

    public ProductsService(
        DataContext dataContext,
        IMapper mapper)
    {
        this.dataContext = dataContext;
        this.mapper = mapper;
    }

    public async Task<IEnumerable<Product>> GetProducts()
    {
        var entities = await dataContext.Products.ToListAsync();
        return entities.Select(mapper.Map<Product>);
    }
}
