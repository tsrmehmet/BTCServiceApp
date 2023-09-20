using Application.Interfaces.Services;
using System.Security.Cryptography;
using System.Text;

namespace Persistence.Services
{
    public class EncryptionService : IEncryptionService
    {
        #region Utilities

        #region EncryptTextToMemory

        /// Encrypt text to memory
        /// <param name="data"></param>
        /// <param name="key"></param>
        /// <param name="iv"></param>
        private static byte[] EncryptTextToMemory(string data, byte[] key, byte[] iv)
        {
            using var ms = new MemoryStream();
            using (var cs = new CryptoStream(ms, new TripleDESCryptoServiceProvider().CreateEncryptor(key, iv), CryptoStreamMode.Write))
            {
                var toEncrypt = Encoding.Unicode.GetBytes(data);
                cs.Write(toEncrypt, 0, toEncrypt.Length);
                cs.FlushFinalBlock();
            }

            return ms.ToArray();
        }

        #endregion

        #region DecryptTextFromMemory

        /// Decrypt text from memory
        /// <param name="data"></param>
        /// <param name="key"></param>
        /// <param name="iv"></param>
        private static string DecryptTextFromMemory(byte[] data, byte[] key, byte[] iv)
        {
            using var ms = new MemoryStream(data);
            using var cs = new CryptoStream(ms, new TripleDESCryptoServiceProvider().CreateDecryptor(key, iv), CryptoStreamMode.Read);
            using var sr = new StreamReader(cs, Encoding.Unicode);
            return sr.ReadToEnd();
        }

        #endregion

        #endregion

        #region Methods

        #region CreateSaltKey

        /// Create salt key
        /// <param name="size">Key size</param>
        public virtual string CreateSaltKey(int size = 5)
        {
            //generate a cryptographic random number
            using var provider = new RNGCryptoServiceProvider();
            var buff = new byte[size];
            provider.GetBytes(buff);

            // Return a Base64 string representation of the random number
            return Convert.ToBase64String(buff);
        }

        /// Create a password hash
        /// <param name="password">Password</param>
        /// <param name="saltkey">Salk key</param>
        /// <param name="passwordFormat">Password format (hash algorithm)</param>
        public virtual string CreatePasswordHash(string password, string saltkey, string passwordFormat = "SHA512")
        {
            return CreateHash(Encoding.UTF8.GetBytes(string.Concat(password, saltkey)), passwordFormat);
        }

        #endregion

        #region EncryptText

        /// Encrypt text
        /// <param name="plainText">Text to encrypt</param>
        /// <param name="encryptionPrivateKey">Encryption private key</param>
        public virtual string EncryptText(string plainText, string encryptionPrivateKey = "")
        {
            if (string.IsNullOrEmpty(plainText))
                return plainText;

            using var provider = new TripleDESCryptoServiceProvider
            {
                Key = Encoding.ASCII.GetBytes(encryptionPrivateKey.Substring(0, 16)),
                IV = Encoding.ASCII.GetBytes(encryptionPrivateKey.Substring(8, 8))
            };

            var encryptedBinary = EncryptTextToMemory(plainText, provider.Key, provider.IV);
            return Convert.ToBase64String(encryptedBinary);
        }

        #endregion

        #region DecryptText

        /// Decrypt text
        /// <param name="cipherText">Text to decrypt</param>
        /// <param name="encryptionPrivateKey">Encryption private key</param>
        public virtual string DecryptText(string cipherText, string encryptionPrivateKey = "")
        {
            if (string.IsNullOrEmpty(cipherText))
                return cipherText;

            TripleDES provider = TripleDES.Create();
            provider.Key = Encoding.ASCII.GetBytes(encryptionPrivateKey.Substring(0, 16));
            provider.IV = Encoding.ASCII.GetBytes(encryptionPrivateKey.Substring(8, 8));

            var buffer = Convert.FromBase64String(cipherText);
            return DecryptTextFromMemory(buffer, provider.Key, provider.IV);
        }

        #endregion

        #region CreateHash

        /// Create a data hash
        /// <param name="data">The data for calculating the hash</param>
        /// <param name="hashAlgorithm">Hash algorithm</param>
        /// <param name="trimByteCount">The number of bytes, which will be used in the hash algorithm; leave 0 to use all array</param>
        public virtual string CreateHash(byte[] data, string hashAlgorithm, int trimByteCount = 0)
        {
            if (string.IsNullOrEmpty(hashAlgorithm))
                throw new ArgumentNullException(nameof(hashAlgorithm));

            var algorithm = (HashAlgorithm)CryptoConfig.CreateFromName(hashAlgorithm);
            if (algorithm == null)
                throw new ArgumentException("Unrecognized hash name");

            if (trimByteCount > 0 && data.Length > trimByteCount)
            {
                var newData = new byte[trimByteCount];
                Array.Copy(data, newData, trimByteCount);

                return BitConverter.ToString(algorithm.ComputeHash(newData)).Replace("-", string.Empty);
            }

            return BitConverter.ToString(algorithm.ComputeHash(data)).Replace("-", string.Empty);
        }

        #endregion

        #endregion
    }
}
