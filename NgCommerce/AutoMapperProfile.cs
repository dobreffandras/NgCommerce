using AutoMapper;
using NgCommerce.Data;
using NgCommerce.Model;

namespace NgCommerce;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<NewProduct, ProductEntity>().ForMember(x => x.Id, o => o.Ignore());
        CreateMap<ProductEntity, Product>().ReverseMap();
    }
}
