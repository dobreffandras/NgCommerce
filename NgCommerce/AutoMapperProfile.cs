using AutoMapper;
using NgCommerce.Data;
using NgCommerce.Model;

namespace NgCommerce;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<ProductEntity, Product>().ReverseMap();
    }
}
