import { useEffect, useRef, useState } from "react";

export function useWebSocket(url) {
    const wsRef = useRef(null);
    const [connected, setConnected] = useState(false);
    const [lastMsg, setLastMsg] = useState(null);

    useEffect(() => {
        const ws = new WebSocket(url);
        wsRef.current = ws;

        ws.onopen = () => setConnected(true)
        ws.onclose = () => setConnected(false)
        ws.onmessage = (e) => {
            try { setLastMsg(JSON.parse(e.data)); }
            catch { setLastMsg(e.data); }
        };

        return () => ws.close();
    }, [url])

    const send = (obj) => wsRef.current?.send(JSON.stringify(obj));

    return { connected, lastMsg, send };
}