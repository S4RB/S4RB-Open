const fs = require('fs');
const Promise = require('bluebird');

module.exports = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err)
                return reject(err);
            resolve(data);
        });
    })   
};
