var WebSocketServer = require('ws').Server,
wss = new WebSocketServer({port:8888});

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
                        //var msgdata = {
                        //    "jsonrpc": "2.0",
                        //    "screen": "Main",
                        //    "result": "Connected"
                        //};
                        // send data
                        //client.send(JSON.stringify(msgdata));

                        //// send a Blob(二进制对象)
                        //var blob = new Blob("blob contents");
                        //client.send(blob);

                        //console.log(blob);

                        // send a ArrayBuffer
                        //var a = new Uint8Array([8, 7, 6, 5, 4., 3, 0, 9]);
                        //client.send(a.buffer);
                        //console.log(a);


                        var buffer = new ArrayBuffer(2);
                        var uint8View = new Uint8Array(buffer);
                        uint8View[0] = 1;
                        uint8View[1] = 0;
                        client.send(uint8View);
                        console.log(uint8View);
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


