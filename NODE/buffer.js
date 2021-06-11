/*let buf = new Buffer(256);
let len = buf.write("working in Node.js");
console.log(len);*/
let buf = new Buffer(26)
for(let i=0; i<26; i++)
buf[i] = i+ 97;
console.log(buf.toString());
let buf1 = new Buffer("Hello");
console.log(buf1.toString());
console.log(buf1.toJSON());
let buf2 = new Buffer(" I am working in node.js");
console.log(Buffer.concat([buf1,buf2]).toString());
console.log(buf1.compare(buf2));
let buf3 = new Buffer(7)
buf.copy(buf3,0,0);
console.log(buf3.toString());
console.log(buf.length);