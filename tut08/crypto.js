import { createCipheriv, createDecipheriv } from 'crypto';

function Encryption(params) {
    const cipher = createCipheriv('aes-128-ecb', params, null);
    let encrypted = cipher.update('my secret', 'utf8', 'base64');
    encrypted += cipher.final('base64');
    console.log(encrypted);
    return encrypted;
}

function Decryption(params) {
    const decipher = createDecipheriv('aes-128-ecb', params, null);
    let decrypted = decipher.update('8Cx6EsM58Suj6jSIdlogLQ==', 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    console.log(decrypted);
    return decrypted
}

export default { Encryption, Decryption };