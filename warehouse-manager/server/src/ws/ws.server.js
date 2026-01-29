import { WebSocketServer, WebSocket } from "ws";
import { handleMessage } from "./ws.handlers.js";

export function createWsServer(httpServer){
    const wss = new WebSocketServer({ server: httpServer });

    const clients = new Set()

    const broadcast = (payload) => {
        const data = JSON.stringify(payload);  
        for (const ws of clients){
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(data);
            }
        }
    };

    wss.on("connection", (ws) => {
        clients.add(ws);


        ws.on("message", (raw) => {
            try{
                const msg = JSON.parse(raw.toString())
                handleMessage(msg, { broadcast })
            }catch {}
        });

        ws.on("close", () => clients.delete(ws));
    })


    return { wss, broadcast };
}   
