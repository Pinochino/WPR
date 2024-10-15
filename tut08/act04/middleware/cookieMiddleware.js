// middleware/cookieMiddleware.js
const crypto = require('crypto');

const key = Buffer.from('1234567890abcdef'); // Ensure this is your encryption key

const encryptCookie = (cookie) => {
    const cipher = crypto.createCipheriv('aes-128-ecb', key, null);
    let encrypted = cipher.update(cookie, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
};

const decryptCookie = (cookie) => {
    const decipher = crypto.createDecipheriv('aes-128-ecb', key, null);
    let decrypted = decipher.update(cookie, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};

module.exports = {
    encryptCookie,
    decryptCookie,
};

