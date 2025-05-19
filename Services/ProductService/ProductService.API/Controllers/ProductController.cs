using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProductService.Application.DTOs;

[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
    [HttpGet]
    [Authorize(Roles = "Admin,Manager")]
    public IActionResult GetAllProducts()
    {
        return Ok();
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public IActionResult CreateProduct(CreateProductDto dto)
    {
        return Ok();
    }
}
