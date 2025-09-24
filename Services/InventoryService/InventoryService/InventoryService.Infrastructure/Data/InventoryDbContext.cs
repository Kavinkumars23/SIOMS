using InventoryService.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace InventoryService.Infrastructure.Data
{
    public class InventoryDbContext : DbContext
    {
        public InventoryDbContext(DbContextOptions<InventoryDbContext> options) : base(options) { }

        public DbSet<Warehouse> Warehouses => Set<Warehouse>();
        public DbSet<StockItem> StockItems => Set<StockItem>();
        public DbSet<StockLedger> StockLedgers => Set<StockLedger>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Warehouse>(b =>
            {
                b.HasKey(x => x.Id);
                b.Property(x => x.Name).IsRequired().HasMaxLength(150);
                b.Property(x => x.Location).HasMaxLength(150);
            });

            modelBuilder.Entity<StockItem>(b =>
            {
                b.HasKey(x => x.Id);
                b.HasIndex(x => new { x.ProductId, x.WarehouseId }).IsUnique();
                b.Property(x => x.OnHand).HasPrecision(18, 2);
                b.Property(x => x.Reserved).HasPrecision(18, 2);
            });

            modelBuilder.Entity<StockLedger>(b =>
            {
                b.HasKey(x => x.Id);
                b.Property(x => x.Quantity).HasPrecision(18, 2);
                b.Property(x => x.BeforeQty).HasPrecision(18, 2);
                b.Property(x => x.AfterQty).HasPrecision(18, 2);
                b.Property(x => x.CreatedAt).HasDefaultValueSql("GETUTCDATE()");
                b.HasIndex(x => new { x.ProductId, x.WarehouseId, x.CreatedAt });
            });
        }
    }
}
