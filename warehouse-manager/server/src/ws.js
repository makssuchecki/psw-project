import WebSocket, { WebSocketServer } from "ws"

function startWebSocket(httpServer){
    const wss = new WebSocket.Server({
        server: httpServer,
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
        
    })
}


export default startWebSocket;