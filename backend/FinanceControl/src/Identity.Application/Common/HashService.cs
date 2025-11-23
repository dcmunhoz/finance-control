using System.Security.Cryptography;
using System.Text;

namespace Identity.Application.Common;

public static class HashService
{
    public static string Compute(string stringToHash)
    {
        byte[] keyBytes = Encoding.UTF8.GetBytes("SuperStr0ngK3y");
        using var hmacSha256 = new HMACSHA256(keyBytes);
        byte[] stringBytes = Encoding.UTF8.GetBytes(stringToHash);
        byte[] hashBytes = hmacSha256.ComputeHash(stringBytes);

        return Convert.ToHexString(hashBytes);
    }
}