using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProductService.Application.DTOs;
using ProductService.Application.Interfaces;
using ProductService.Domain.Entities;

[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
    private readonly IProductRepository _repo;
    private readonly IMapper _mapper;

    public ProductController(IProductRepository repo, IMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var products = await _repo.GetAllAsync();
        var dto = _mapper.Map<IEnumerable<GetProductDto>>(products);
        return Ok(dto);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var product = await _repo.GetByIdAsync(id);
        if (product == null) return NotFound();
        return Ok(_mapper.Map<GetProductDto>(product));
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateProductDto dto)
    {
        var product = _mapper.Map<Product>(dto);
        await _repo.AddAsync(product);
        await _repo.SaveChangesAsync();

        var result = _mapper.Map<GetProductDto>(product);
        return CreatedAtAction(nameof(GetById), new { id = product.Id }, result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, UpdateProductDto dto)
    {
        var product = await _repo.GetByIdAsync(id);
        if (product == null) return NotFound();

        _mapper.Map(dto, product);
        _repo.Update(product);
        await _repo.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var product = await _repo.GetByIdAsync(id);
        if (product == null) return NotFound();

        _repo.Delete(product);
        await _repo.SaveChangesAsync();
        return NoContent();
    }
}
