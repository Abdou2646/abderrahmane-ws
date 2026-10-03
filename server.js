const http = require("http");
const { WebSocketServer } = require("ws");

const PORT = Number(process.env.PORT || 10000);
const WS_PATH = process.env.WS_PATH || "/Telegram/@ABDO/ws";

const testPage = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Abderrahmane WebSocket Test</title>

  <style>
    body {
      margin: 0;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #080b12;
      color: white;
      font-family: Arial, sans-serif;
    }

    .card {
      width: 90%;
      max-width: 420px;
      padding: 30px;
      border-radius: 20px;
      background: #111722;
      text-align: center;
      box-shadow: 0 0 40px rgba(0,0,0,.5);
    }

    h1 {
      margin-top: 0;
    }

    #status {
      padding: 15px;
      margin: 20px 0;
      border-radius: 12px;
      background: #1b2230;
    }

    button {
      width: 100%;
      padding: 15px;
      border: 0;
      border-radius: 12px;
      font-size: 17px;
      cursor: pointer;
      margin-top: 10px;
    }

    #connect {
      background: #ffffff;
      color: #000000;
    }

    #send {
      background: #252d3b;
      color: white;
    }

    #log {
      text-align: left;
      margin-top: 20px;
      padding: 15px;
      min-height: 80px;
      background: #05070b;
      border-radius: 10px;
      font-family: monospace;
      overflow-wrap: anywhere;
    }
  </style>
</head>

<body>

<div class="card">

  <h1>⚡ WebSocket Test</h1>

  <p>
    abderrahmane-ws.onrender.com
  </p>

  <div id="status">
    ⚪ Disconnected
  </div>

  <button id="connect">
    Connect WebSocket
  </button>

  <button id="send">
    Send Test Message
  </button>

  <div id="log">
    Waiting...
  </div>

</div>

<script>

let ws;

const status = document.getElementById("status");
const log = document.getElementById("log");

document.getElementById("connect").onclick = () => {

  const protocol =
    location.protocol === "https:" ? "wss:" : "ws:";

  const url =
    protocol + "//" + location.host +
    "${WS_PATH}";

  log.innerHTML =
    "Connecting to:<br>" + url;

  ws = new WebSocket(url);

  ws.onopen = () => {

    status.innerHTML =
      "🟢 WebSocket Connected";

    log.innerHTML +=
      "<br><br>Connection successful ✅";

  };

  ws.onmessage = (event) => {

    log.innerHTML +=
      "<br><br>Server: " + event.data;

  };

  ws.onerror = () => {

    status.innerHTML =
      "🔴 Connection Error";

    log.innerHTML +=
      "<br><br>WebSocket error ❌";

  };

  ws.onclose = () => {

    status.innerHTML =
      "⚪ Disconnected";

  };

};

document.getElementById("send").onclick = () => {

  if (!ws || ws.readyState !== WebSocket.OPEN) {

    log.innerHTML +=
      "<br><br>❌ Connect first.";

    return;

  }

  ws.send("Hello from Abderrahmane 👋");

};

</script>

</body>
</html>`;


const server = http.createServer((req, res) => {

  if (req.url === "/") {

    res.writeHead(200, {
      "content-type": "text/html; charset=utf-8"
    });

    res.end(testPage);

    return;
  }

  res.writeHead(404, {
    "content-type": "text/plain; charset=utf-8"
  });

  res.end("Not found");

});


const wss = new WebSocketServer({
  noServer: true
});


server.on("upgrade", (req, socket, head) => {

  const path =
    (req.url || "").split("?")[0];

  if (path !== WS_PATH) {

    socket.write(
      "HTTP/1.1 404 Not Found\\r\\n" +
      "Connection: close\\r\\n\\r\\n"
    );

    socket.destroy();

    return;
  }

  wss.handleUpgrade(
    req,
    socket,
    head,
    ws => {

      wss.emit(
        "connection",
        ws,
        req
      );

    }
  );

});


wss.on("connection", ws => {

  ws.send(
    "Connected to Abderrahmane WebSocket server 🚀"
  );

  ws.on("message", data => {

    ws.send(
      "Echo: " + data.toString()
    );

  });

});


server.listen(
  PORT,
  "0.0.0.0",
  () => {

    console.log(
      "Server running on port " + PORT
    );

    console.log(
      "WebSocket path: " + WS_PATH
    );

  }
);
