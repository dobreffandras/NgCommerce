using NgCommerce.Model.Services;

namespace NgCommerce;

public static class WebApplicationBuilderExtensions
{
    public static void ConfigureServices(this WebApplicationBuilder builder)
    {
        builder.Services.AddScoped<IProductsService, ProductsService>();
    }
}
