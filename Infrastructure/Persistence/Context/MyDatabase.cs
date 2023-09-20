using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Persistence.Context
{
    public class MyDatabase : DbContext
    {
        #region Constructor

        public MyDatabase(DbContextOptions<MyDatabase> options) : base(options)
        {

        }

        #endregion

        #region Database Tables

        public DbSet<Bitcoin> Bitcoin { get; set; }
        public DbSet<User> User { get; set; }

        #endregion

        #region Override OnModelCreating

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            foreach (IMutableForeignKey item in modelBuilder.Model.GetEntityTypes().SelectMany(x => x.GetForeignKeys()))
            {
                item.DeleteBehavior = DeleteBehavior.Restrict;
            }
        }

        #endregion
    }
}
