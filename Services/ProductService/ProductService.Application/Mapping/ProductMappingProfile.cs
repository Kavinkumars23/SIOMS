using AutoMapper;
using ProductService.Domain.Entities;
using ProductService.Application.DTOs;

public class ProductMappingProfile : Profile
{
    public ProductMappingProfile()
    {
        // Entity → Read DTO
        CreateMap<Product, GetProductDto>()
            .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.Name));

        CreateMap<Product, ProductDto>()
            .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.Name));

        // Create DTO → Entity
        CreateMap<CreateProductDto, Product>();

        // Update DTO → Entity
        CreateMap<UpdateProductDto, Product>();

        
        CreateMap<Product, DeleteProductDto>();

        CreateMap<CreateCategoryDto, Category>();
        CreateMap<Category, GetCategoryDto>();

    }
}
