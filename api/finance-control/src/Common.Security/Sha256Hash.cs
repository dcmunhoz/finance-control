using System.Security.Cryptography;
using System.Text;

namespace Common.Security;

public static class Sha256Hash
{
    public static string Encrypt(string rawString)
    {
        using var sha256 = SHA256.Create();

        byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(rawString));

        return Convert.ToHexString(bytes).ToLowerInvariant();
    }
}