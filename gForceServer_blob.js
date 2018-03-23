var WebSocketServer = require('ws').Server;
var ws = new WebSocketServer({port:8888});
console.log("nodejs server started!!!");

// ws.binaryType = 'blob';

var reader = new FileReader();

ws.on('connection', function(ws){
    console.log('client connected');
    ws.on('message', function (message) {

        
        reader.readAsArrayBuffer(blob);
        reader.addEventListener("loadend",function() {
            console.log("Blob content is: "+reader.result);   // log is : Blob content is: [object ArrayBuffer]
            var resultView = new Uint8Array(reader.result);
            console.log("reader.result.View = "+resultView);
        });        
        console.log("get message from client:"+message.data);    // 打印一个字符串
    });
});

