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

    public async Task<Result<Product>> GetProduct(int id)
    {
        var product = await dataContext.Products.FirstOrDefaultAsync(p => p.Id == id);
        return product is not null 
            ? Result.Ok(mapper.Map<Product>(product)) 
            : Result.Error<Product>("Product not Found");
    }

    public async Task<IEnumerable<Product>> GetProducts()
    {
        var entities = await dataContext.Products.ToListAsync();
        return entities.Select(mapper.Map<Product>);
    }

    public async Task<Result> UpdateProduct(Product product)
    {
        var existing = await dataContext.Products.FirstOrDefaultAsync(p => p.Id == product.Id);
        if(existing is null)
        {
            return Result.Error($"No product with Id {product.Id}");
        }

        existing.Name = product.Name;
        existing.Price = product.Price;
        existing.CoverImageUrl = product.CoverImageUrl;
        existing.Description = product.Description;
        existing.Category = product.Category;

        await dataContext.SaveChangesAsync();

        return Result.Ok();
    }

    public async Task<Result> DeleteProduct(int id)
    {
        var existing = await dataContext.Products.FirstOrDefaultAsync(p => p.Id == id);
        if (existing is null)
        {
            return Result.Error($"No product with Id {id}");
        }

        dataContext.Products.Remove(existing);
        await dataContext.SaveChangesAsync();
        return Result.Ok();
    }

}