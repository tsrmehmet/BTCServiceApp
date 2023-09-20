namespace Application.Interfaces.Services
{
    public interface IEncryptionService
    {
        /// Create salt key
        /// <param name="size">Key size</param>
        string CreateSaltKey(int size = 5);

        /// Create a password hash
        /// <param name="password">Password</param>
        /// <param name="saltKey">Salk key</param>
        /// <param name="passwordFormat">Password format (hash algorithm)</param>
        string CreatePasswordHash(string password, string saltKey, string passwordFormat = "SHA512");

        /// Encrypt text
        /// <param name="plainText">Text to encrypt</param>
        /// <param name="encryptionPrivateKey">Encryption private key</param>
        string EncryptText(string plainText, string encryptionPrivateKey = "");

        /// Decrypt text
        /// <param name="cipherText">Text to decrypt</param>
        /// <param name="encryptionPrivateKey">Encryption private key</param>
        string DecryptText(string cipherText, string encryptionPrivateKey = "");

        /// Create a data hash
        /// <param name="data">The data for calculating the hash</param>
        /// <param name="hashAlgorithm">Hash algorithm</param>
        /// <param name="trimByteCount">The number of bytes, which will be used in the hash algorithm; leave 0 to use all array</param>
        string CreateHash(byte[] data, string hashAlgorithm, int trimByteCount = 0);
    }
}
