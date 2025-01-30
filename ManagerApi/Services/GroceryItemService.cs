using ManagerApi.Models;
using MongoDB.Driver;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ManagerApi.Services
{
    public class GroceryItemService
    {
        private readonly IMongoCollection<GroceryItem> _groceryItems;

        public GroceryItemService(IOptions<MongoDBSettings> mongoDBSettings)
        {
             var client = new MongoClient(mongoDBSettings.Value.ConnectionString);  
            var database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
            _groceryItems = database.GetCollection<GroceryItem>("GroceryItems");
             
            
        }

        public async Task<List<GroceryItem>> GetAsync() =>
            await _groceryItems.Find(groceryItem => true).ToListAsync();

        public async Task<GroceryItem> GetAsync(string id) =>
            await _groceryItems.Find(groceryItem => groceryItem.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(GroceryItem groceryItem) =>
            await _groceryItems.InsertOneAsync(groceryItem);

        public async Task UpdateAsync(string id, GroceryItem groceryItem) =>
            await _groceryItems.ReplaceOneAsync(groceryItem => groceryItem.Id == id, groceryItem);

        public async Task RemoveAsync(string id) =>
            await _groceryItems.DeleteOneAsync(groceryItem => groceryItem.Id == id);
    }
}
