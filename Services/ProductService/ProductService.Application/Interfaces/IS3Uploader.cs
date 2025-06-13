using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductService.Application.Interfaces
{
    public interface IS3Uploader
    {
        Task<string> UploadFileAsync(IFormFile file);
    }
}
