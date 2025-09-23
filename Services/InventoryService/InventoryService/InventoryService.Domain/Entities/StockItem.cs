using System.ComponentModel.DataAnnotations.Schema;

namespace InventoryService.Domain.Entities;

public class StockItem
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid ProductId { get; set; }
    public Guid WarehouseId { get; set; }
    public int OnHand { get; set; }
    public int Reserved { get; set; }
    [NotMapped] public int Available => OnHand - Reserved;

    public Warehouse? Warehouse { get; set; }
}
