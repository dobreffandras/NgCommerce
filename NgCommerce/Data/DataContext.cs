using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace NgCommerce.Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions options)
        : base(options)
    {
    }

    public DbSet<ProductEntity> Products { get; set; }
}
