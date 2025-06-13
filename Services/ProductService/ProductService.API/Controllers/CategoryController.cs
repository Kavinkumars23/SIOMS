using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProductService.Application.DTOs;
using ProductService.Application.Interfaces;
using ProductService.Domain.Entities;

namespace ProductService.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _repo;
        private readonly IMapper _mapper;

        public CategoryController(ICategoryRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var categories = await _repo.GetAllAsync();
            var result = _mapper.Map<IEnumerable<GetCategoryDto>>(categories);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateCategoryDto dto)
        {
            var category = _mapper.Map<Category>(dto);
            await _repo.AddAsync(category);
            await _repo.SaveChangesAsync();

            var result = _mapper.Map<GetCategoryDto>(category);
            return CreatedAtAction(nameof(GetAll), new { id = result.Id }, result);
        }
    }

}
