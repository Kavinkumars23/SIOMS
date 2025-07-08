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
    private readonly IS3Uploader _uploader;

    public ProductController(IProductRepository repo, IMapper mapper, IS3Uploader uploader)
    {
        _repo = repo;
        _mapper = mapper;
        _uploader = uploader;
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
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> Create([FromForm] CreateProductDto dto)
    {
        // Upload image to S3 if provided
        string? imageUrl = null;
        if (dto.Image != null)
        {
            imageUrl = await _uploader.UploadFileAsync(dto.Image);
        }

        // Map DTO to entity
        var product = _mapper.Map<Product>(dto);
        product.ImageUrl = imageUrl;

        // Save to DB
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

        product.IsDeleted = true;
        _repo.Update(product);
        await _repo.SaveChangesAsync();

        return NoContent();
    }


    [HttpGet("search")]
    public async Task<IActionResult> Search(
    [FromQuery] string? name,
    [FromQuery] int? categoryId,
    [FromQuery] decimal? minPrice,
    [FromQuery] decimal? maxPrice,
    [FromQuery] int pageNumber = 1,
    [FromQuery] int pageSize = 10)
    {
        var (products, totalCount) = await _repo.SearchAsync(name, categoryId, minPrice, maxPrice, pageNumber, pageSize);
        var items = _mapper.Map<IEnumerable<GetProductDto>>(products);

        var result = new PagedResult<GetProductDto>
        {
            Items = items,
            TotalCount = totalCount,
            PageNumber = pageNumber,
            PageSize = pageSize
        };

        return Ok(result);
    }




}
