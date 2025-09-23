namespace InventoryService.Domain.Entities;

public class Warehouse
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = string.Empty;
    public string? Location { get; set; }
    public ICollection<StockItem> StockItems { get; set; } = new List<StockItem>();
}
