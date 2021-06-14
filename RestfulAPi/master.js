/*const child_process = require('child_process');
for(var i=0; i<3; i++){
    var workprocess = child_process.exec('node support.js '+i ,function(error,stdout,strder){
        if(error){
            console.log(error.stack)
            console.log("Error Code:"+error.code);
            console.log("Error signaling: "+error.signal)
        }
        console.log("Stduout:"+stdout);
        console.log("strder: "+strder)
    })
    workprocess.on('exit',function(code){
        console.log("Child exited code"+code);
    })
}
const child_process = require('child_process');
 
for(var i = 0; i<3; i++) {
   var workerProcess = child_process.spawn('node', ['support.js', i]);

   workerProcess.stdout.on('data', function (data) {
      console.log('stdout: ' + data);
   });

   workerProcess.stderr.on('data', function (data) {
      console.log('stderr: ' + data);
   });

   workerProcess.on('close', function (code) {
      console.log('child process exited with code ' + code);
   });
}*/
var child_process = require('child_process');``
for(var i=0; i<3; i++) {
    var worker_process = child_process.fork("support.js", [i]);	
 
    worker_process.on('close', function (code) {
       console.log('child process exited with code ' + code);
    });
 }