var WebSocketServer = require('ws').Server,
wss = new WebSocketServer({port:8888});
console.log("nodejs server started!!!");
wss.on('connection', function(ws){
    console.log('client connected');
    ws.on('message', function (message) {
        console.log(message);    // 打印一个字符串
        var msg = JSON.parse(message);  // 将字符串对象化
        console.log(msg.jsonrpc);  // 打印对象中单个的值
        if (msg.jsonrpc == "2.0") {
            console.log(msg.screen);
            // main
            if ("Main" == msg.screen) {
                console.log(msg.action);
                if ("Connect" == msg.action) {
                    // show all data
                    // test for communication of client and server
                    wss.clients.forEach(function each(client) {
                        var msgdata = {
                            "jsonrpc": "2.0",
                            "screen": "Main",
                            "result": "Connected"
                        };
                        // send data
                        client.send(JSON.stringify(msgdata));
                    });
                }
                if ("DisConnect" == msg.action) {
                    // show all data
                    // test for communication of client and server
                    wss.clients.forEach(function each(client) {
                        var msgdata = {
                            "jsonrpc": "2.0",
                            "screen": "Main",
                            "result": "DisConnected"
                        };
                        // send data
                        client.send(JSON.stringify(msgdata));
                    });
                }
            }
            // default
            if ("Default" == msg.screen) {
                console.log(msg.gesture);
                if ("shoot" == msg.gesture) {
                    // show all data
                    // test for communication of client and server
                    wss.clients.forEach(function each(client) {
                        var msgdata = {
                            "jsonrpc": "2.0",
                            "screen": "Default",
                            "gesture": "fist"
                        };
                        // send data
                        client.send(JSON.stringify(msgdata));
                    });
                }
            } 
        }
        else {
          console.log("msg.jsonrp !== 2.0");
        }
    });
});


