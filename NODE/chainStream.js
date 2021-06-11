let fs = require('fs');
let zlib = require('zlib');
//fs.createReadStream('output.txt').pipe(zlib.createGzip()).pipe(fs.createWriteStream('output.txt.gz'));
console.log('compressed');
fs.createReadStream('output.txt.gz').pipe(zlib.createGunzip()).pipe(fs.createWriteStream('output.txt'));
console.log('unzipped');