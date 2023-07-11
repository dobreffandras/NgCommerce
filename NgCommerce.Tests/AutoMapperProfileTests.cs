using AutoMapper;

namespace NgCommerce.Tests;

public class AutoMapperProfileTests
{
    [Fact]
    public void AutoMapper_Configuration_IsValid()
    {
        var config = new MapperConfiguration(cfg => cfg.AddProfile<AutoMapperProfile>());
        config.AssertConfigurationIsValid();
    }
}
