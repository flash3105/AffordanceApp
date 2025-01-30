using Microsoft.AspNetCore.Mvc;
using ManagerApi.Models;
using ManagerApi.Services; // Assuming you have a service to handle MongoDB operations
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System.IO;
using System.Threading.Tasks;
using System;

namespace ManagerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroceryController : ControllerBase
    {
        private readonly GroceryItemService _groceryItemService;
        private readonly IWebHostEnvironment _env;

        public GroceryController(GroceryItemService groceryItemService, IWebHostEnvironment env)
        {
            _groceryItemService = groceryItemService;
            _env = env;
        }

        // GET: api/grocery
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GroceryItem>>> GetGroceries()
        {
            var groceries = await _groceryItemService.GetAsync();
            return Ok(groceries);
        }

        // GET: api/grocery/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GroceryItem>> GetGrocery(string id)
        {
            var grocery = await _groceryItemService.GetAsync(id);
            if (grocery == null)
            {
                return NotFound();
            }
            return Ok(grocery);
        }

        // POST: api/grocery (with file upload)
        [HttpPost]
        public async Task<ActionResult<GroceryItem>> PostGrocery([FromForm] GroceryItem grocery, IFormFile? file)
        {
            if (file != null)
            {
                var uploadsFolder = Path.Combine(_env.WebRootPath, "uploads");
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                var uniqueFileName = Guid.NewGuid().ToString() + "_" + file.FileName;
                var filePath = Path.Combine(uploadsFolder, uniqueFileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                grocery.PhotoUrl = $"/uploads/{uniqueFileName}";
            }

            await _groceryItemService.CreateAsync(grocery);
            return CreatedAtAction(nameof(GetGrocery), new { id = grocery.Id }, grocery);
        }

        // PUT: api/grocery/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGrocery(string id, GroceryItem grocery)
        {
            if (id != grocery.Id)
            {
                return BadRequest();
            }

            await _groceryItemService.UpdateAsync(id, grocery);
            return NoContent();
        }

        // DELETE: api/grocery/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGrocery(string id)
        {
            var grocery = await _groceryItemService.GetAsync(id);
            if (grocery == null)
            {
                return NotFound();
            }

            await _groceryItemService.RemoveAsync(id);
            return NoContent();
        }
    }
}
