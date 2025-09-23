using Microsoft.EntityFrameworkCore;
using InventoryService.Domain.Entities;

namespace InventoryService.Infrastructure.Data;

public class InventoryDbContext : DbContext
{
    public InventoryDbContext(DbContextOptions<InventoryDbContext> options) : base(options) { }

    public DbSet<Warehouse> Warehouses => Set<Warehouse>();
    public DbSet<StockItem> StockItems => Set<StockItem>();
    public DbSet<StockLedger> StockLedgers => Set<StockLedger>();

    protected override void OnModelCreating(ModelBuilder b)
    {
        b.Entity<Warehouse>().Property(x => x.Name).HasMaxLength(100).IsRequired();

        b.Entity<StockItem>()
            .HasIndex(s => new { s.ProductId, s.WarehouseId })
            .IsUnique();
        b.Entity<StockItem>()
            .HasOne(s => s.Warehouse)
            .WithMany(w => w.StockItems)
            .HasForeignKey(s => s.WarehouseId)
            .OnDelete(DeleteBehavior.Cascade);

        b.Entity<StockLedger>()
            .Property(x => x.CreatedAt)
            .HasDefaultValueSql("GETUTCDATE()");
    }
}
