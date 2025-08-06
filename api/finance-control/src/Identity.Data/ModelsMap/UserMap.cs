using Identity.Business.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Identity.Data.ModelsMap;

public class UserMap : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable("user");

        builder.HasKey(x => x.Id);
        
        builder.Property(x => x.Id)
            .HasColumnName("id")
            .HasColumnType("uuid");

        builder.Property(x => x.Name)
            .HasColumnName("user_name")
            .HasColumnType("text");
        
        builder.Property(x => x.Email)
            .HasColumnName("email")
            .HasColumnType("text");
        
        builder.Property(x => x.Password)
            .HasColumnName("password")
            .HasColumnType("text");
    }
}