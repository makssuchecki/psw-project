const WebSocket = require("ws");

function startWebSocket(httpServer){
    const wss = new WebSocket.Server({
        server,
        path: "/ws"
    });

    wss.on("connection", (ws) => {
        console.log("WS client connected")
        ws.send("connected");

        ws.on("message", (msg) => {
            console.log("WS message:", msg.toString());
        });

        ws.on("close", () => {
            console.log("WS client disconnected")
        });
        
        console.log("WebSocket available at /ws")
    })
}


module.exports = { startWebSocket };