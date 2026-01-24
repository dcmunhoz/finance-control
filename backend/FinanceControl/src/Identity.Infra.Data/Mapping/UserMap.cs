using Identity.Application.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Identity.Infra.Data.Mapping;

public class UserMap : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable("users");
        
        builder.HasKey(x => x.Id);
        
        builder.Property(x => x.Id)
            .HasColumnName("id")
            .HasColumnType("uuid")
            .ValueGeneratedNever();
        
        builder.Property(x => x.Name)
            .HasColumnName("name")
            .HasColumnType("varchar")
            .IsRequired();
        
        builder.Property(x => x.Email)
            .HasColumnName("email")
            .HasColumnType("varchar")
            .IsRequired();
        
        builder.Property(x => x.Password)
            .HasColumnName("password")
            .HasColumnType("varchar")
            .IsRequired();
    }
}