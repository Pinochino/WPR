// models/userModel.js
const fs = require('fs');
const path = require('path');

const usersDataPath = path.join(__dirname, '../users.json');

const loadUsers = () => {
    const data = fs.readFileSync(usersDataPath);
    return JSON.parse(data);
};

const findUserByUsername = (username) => {
    const users = loadUsers();
    return users.find(user => user.username === username);
};

module.exports = {
    loadUsers,
    findUserByUsername,
};
