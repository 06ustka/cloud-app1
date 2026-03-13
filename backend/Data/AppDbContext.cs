using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // To reprezentuje naszą tabelę w bazie
        public DbSet<TaskItem> Tasks { get; set; }
    }
}