const path = require('path');

//getting basename of file
console.log(__filename);

//to get file name
console.log(path.basename(__filename));

//directory name
console.log(path.dirname(__filename));

//get file extension
console.log(path.extname(__filename));

//create path object
console.log(path.parse(__filename));

//concatenate paths
//suppose we want ../test/hello.html
console.log(path.join(__dirname,'test','hello.html'));