using Microsoft.EntityFrameworkCore;

namespace NgCommerce.Data;

public class DataContext : DbContext
{

    public DataContext() : base() { }

    public DataContext(DbContextOptions options) : base(options) { }

    public virtual DbSet<ProductEntity> Products { get; set; }
}
