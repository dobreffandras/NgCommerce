namespace NgCommerce.Tests.Model.Services;

using AutoMapper;
using FluentAssertions;
using Moq;
using Moq.EntityFrameworkCore;
using NgCommerce.Data;
using NgCommerce.Model;
using NgCommerce.Model.Services;

public class ProductServiceTests
{
    private readonly Mock<DataContext> mockDataContext = new Mock<DataContext>();
    private readonly IProductsService sut;

    public ProductServiceTests()
    {
        var mapper = new MapperConfiguration(cfg => cfg.AddProfile(new AutoMapperProfile())).CreateMapper();

        sut = new ProductsService(mockDataContext.Object, mapper);
    }

    [Fact]
    public async Task GetProducts_Returns_Empty_On_EmptyDb()
    {
        // Arrange
        mockDataContext.Setup(x => x.Products).ReturnsDbSet(Array.Empty<ProductEntity>());

        // Act
        var products = await sut.GetProducts();

        // Assert
        products.Should().BeEmpty();
    }
    
    [Fact]
    public async Task GetProducts_Returns_Products_From_Db()
    {
        // Arrange
        mockDataContext
            .Setup(x => x.Products)
            .ReturnsDbSet(new[]
            {
                new ProductEntity() { Id = 1, Name = "Product1"},
                new ProductEntity() { Id = 2, Name = "Product2"},
                new ProductEntity() { Id = 3, Name = "Product3"},
            });

        // Act
        var products = await sut.GetProducts();

        // Assert
        products
            .Should()
            .BeEquivalentTo(new[]
            {
                new Product(1, "Product1"),
                new Product(2, "Product2"),
                new Product(3, "Product3")
            });
    }
    
    [Fact]
    public async Task CreateProduct_Creates_New_Product_In_Db()
    {
        // Arrange
        mockDataContext
            .Setup(x => x.Products)
            .ReturnsDbSet(new[]
            {
                new ProductEntity() { Id = 1, Name = "Product1"},
                new ProductEntity() { Id = 2, Name = "Product2"},
                new ProductEntity() { Id = 3, Name = "Product3"},
            });

        // Act
        await sut.CreateProduct(new NewProduct("Product4"));

        // Assert
        mockDataContext.Verify(
            x => x.Products.AddAsync(
                It.Is<ProductEntity>(x => x.Name == "Product4"), 
                CancellationToken.None), 
            Times.Once());
        mockDataContext.Verify(
            x => x.SaveChangesAsync(CancellationToken.None),
            Times.Once());
    }
    
    [Fact]
    public async Task CreateProduct_Returns_New_Product()
    {
        // Arrange
        mockDataContext
            .Setup(x => x.Products)
            .ReturnsDbSet(new[]
            {
                new ProductEntity() { Id = 1, Name = "Product1"},
                new ProductEntity() { Id = 2, Name = "Product2"},
                new ProductEntity() { Id = 3, Name = "Product3"},
            });
        const int newId = 4;
        mockDataContext
            .Setup(x => x.Products.AddAsync(It.IsAny<ProductEntity>(), CancellationToken.None))
            .Callback<ProductEntity, CancellationToken>((e, _) => e.Id = newId);

        // Act
        var result = await sut.CreateProduct(new NewProduct("Product4"));

        // Assert
        result
            .Should()
            .BeEquivalentTo(Result.Ok(new Product(newId, "Product4")));
    }
    
    [Fact]
    public async Task CreateProduct_Returns_Error_When_Product_Exists_With_Same_Name()
    {
        // Arrange
        mockDataContext
            .Setup(x => x.Products)
            .ReturnsDbSet(new[]
            {
                new ProductEntity() { Id = 1, Name = "Product1"},
                new ProductEntity() { Id = 2, Name = "Product2"},
                new ProductEntity() { Id = 3, Name = "Product3"},
            });

        // Act
        var result = await sut.CreateProduct(new NewProduct("Product1"));

        // Assert
        result.Should().BeEquivalentTo(Result.Error<Product>("Product with name 'Product1' already exists"));
    }
}
