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

    public async Task<Result<Product>> CreateProduct(NewProduct newProduct)
    {
        var existing = await dataContext.Products.FirstOrDefaultAsync(p => p.Name == newProduct.Name);
        if(existing is not null)
        {
            return Result.Error<Product>($"Product with name '{newProduct.Name}' already exists");
        }

        var newEntity = mapper.Map<ProductEntity>(newProduct);
        await dataContext.Products.AddAsync(newEntity);
        await dataContext.SaveChangesAsync();

        return Result.Ok(mapper.Map<Product>(newEntity));
    }

    public async Task<IEnumerable<Product>> GetProducts()
    {
        var entities = await dataContext.Products.ToListAsync();
        return entities.Select(mapper.Map<Product>);
    }
}