const http = require("http");
const { WebSocketServer } = require("ws");

const PORT = Number(process.env.PORT || 10000);
const WS_PATH = process.env.WS_PATH || "/Telegram/@ABDO/ws";

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, {"content-type":"application/json; charset=utf-8"});
    res.end(JSON.stringify({
      status: "ok",
      service: "abderrahmane-ws",
      websocketPath: WS_PATH
    }));
    return;
  }
  res.writeHead(404, {"content-type":"text/plain; charset=utf-8"});
  res.end("Not found");
});

const wss = new WebSocketServer({ noServer: true });

server.on("upgrade", (req, socket, head) => {
  const path = (req.url || "").split("?")[0];
  if (path !== WS_PATH) {
    socket.write("HTTP/1.1 404 Not Found\r\nConnection: close\r\n\r\n");
    socket.destroy();
    return;
  }

  wss.handleUpgrade(req, socket, head, ws => {
    wss.emit("connection", ws, req);
  });
});

wss.on("connection", ws => {
  ws.send("Connected to Abderrahmane WebSocket test service");
  ws.on("message", data => ws.send(data)); // echo test
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Listening on ${PORT}; WebSocket path: ${WS_PATH}`);
});
