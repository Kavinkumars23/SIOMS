using ProductService.Application.DTOs;
using ProductService.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductService.Application.Services
{
    public class ProductRepository : IProductService
    {
        public Task CreateAsync(CreateProductDto dto)
        {
            throw new NotImplementedException();
        }

        public Task DeleteAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<GetProductDto>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task<GetProductDto> GetByIdAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(Guid id, UpdateProductDto dto)
        {
            throw new NotImplementedException();
        }
    }
}
