import { WebSocketServer, WebSocket } from "ws";

export function createWsServer(httpServer){
    const wss = new WebSocketServer({ server: httpServer });

    const clients = new Set()

    wss.on("connection", (ws) => {
        clients.add(ws);


        ws.on("message", (raw) => {
            try{
                const msg = JSON.parse(raw.toString())
            }catch {}
        });

        ws.on("close", () => clients.delete(ws));
    })

    const broadcast = (payload) => {
        const data = JSON.stringify(payload);  
        for (const ws of clients){
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(data);
            }
        }
    };
    return { wss, broadcast };
}   