using IdentityService.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IdentityService.Application.Interfaces
{
    public interface IAuthService
    {
        Task<String> RegisterAsync(RegisterUserDto dto);
        Task<String> LoginAsync(LoginUserDto dto);
    }
}
