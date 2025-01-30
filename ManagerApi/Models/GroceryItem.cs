using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ManagerApi.Models
{
    public class GroceryItem
    {
        [BsonId]
        public string Id { get; set; } // MongoDB's ObjectId as string

        public string Name { get; set; }
        public string Shop { get; set; }
        public decimal Price { get; set; }
        public string Size { get; set; }
        public string PhotoUrl { get; set; }  // URL for the product photo
        public string Attachment { get; set; } // URL or path for the attachment (e.g., a product manual, recipe, etc.)

        
    }
}
