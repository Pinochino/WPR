const crypto = require('crypto');

function encryptText(plainText, key) {
    const cipher = crypto.createCipheriv('aes-128-ecb', key, null);
    let encrypted = cipher.update(plainText, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
}

function decryptText(encryptedText, key) {
    const decipher = crypto.createDecipheriv('aes-128-ecb', key, null);
    let decrypted = decipher.update(encryptedText, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
module.exports = {
    encryptText,
    decryptText
};

const key = 'mypassword123456';
const plainText = 'This is a secret message';
try {
    const encryptedText = encryptText(plainText, key);
    console.log('Encrypted Text:', encryptedText);
    const decryptedText = decryptText(encryptedText, key);
    console.log('Decrypted Text:', decryptedText);
} catch (err) {
    console.error(err.message);
}