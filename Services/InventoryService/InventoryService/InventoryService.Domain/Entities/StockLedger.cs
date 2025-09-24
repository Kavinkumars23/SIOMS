namespace InventoryService.Domain.Entities;

public enum MovementType { In, Out, Reserve, Release, Issue }

public class StockLedger
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid ProductId { get; set; }
    public Guid WarehouseId { get; set; }
    public MovementType MovementType { get; set; }
    public decimal Quantity { get; set; }
    public decimal BeforeQty { get; set; }
    public decimal AfterQty { get; set; }
    public string? Note { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
