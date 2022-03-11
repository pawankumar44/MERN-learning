const path = require('path');
const fs = require('fs');//fs is file system

//create folder on sytem
fs.mkdir(path.join(__dirname,'/test'),{},err => {
    if (err) throw err;
    console.log('Folder created');
})