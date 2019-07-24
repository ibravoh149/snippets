import fs from 'fs';

let files = fs.readdirSync(__dirname +'/../controllers');

module.exports = files.forEach((fileName)=>{
    require(__dirname + '/../controllers/' + fileName)
});