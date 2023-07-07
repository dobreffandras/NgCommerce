using AutoMapper;
using NgCommerce.Data;
using NgCommerce.Model;

namespace NgCommerce;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<NewProduct, ProductEntity>();
        CreateMap<ProductEntity, Product>().ReverseMap();
    }
}
