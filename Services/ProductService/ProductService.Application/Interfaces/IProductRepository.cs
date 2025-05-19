using ProductService.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductService.Application.Interfaces
{
    public interface IProductService
    {
        Task<IEnumerable<GetProductDto>> GetAllAsync();
        Task<GetProductDto> GetByIdAsync(Guid id);
        Task CreateAsync(CreateProductDto dto);
        Task UpdateAsync(Guid id, UpdateProductDto dto);
        Task DeleteAsync(Guid id);
    }

}
