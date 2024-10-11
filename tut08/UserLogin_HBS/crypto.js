const crypto = require('crypto');

// AES-128-CBC key must be 16 bytes (128 bits)
// For AES-256-CBC, it should be 32 bytes
const key = Buffer.from('your-16-byte-secret'); // Use your actual 16-byte key

// Encrypt function
function encrypt(text) {
    const iv = crypto.randomBytes(16);  // Generate a random IV (16 bytes for AES)
    const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);  // AES-128-CBC with IV
    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    // Concatenate IV and encrypted data, separated by a colon
    return iv.toString('hex') + ':' + encrypted;
}

// Decrypt function
function decrypt(encryptedText) {
    // Split the encrypted text to get the IV and the actual encrypted data
    const textParts = encryptedText.split(':');
    const iv = Buffer.from(textParts[0], 'hex');  // IV is the first part
    const encryptedData = textParts[1];  // Encrypted data is the second part

    const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

module.exports = { encrypt, decrypt };
