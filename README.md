# Abderrahmane WebSocket Test Service

Small WebSocket echo service prepared for Render.

## Defaults
- Service name: `abderrahmane-ws`
- WebSocket path: `/Telegram/@ABDO/ws`
- Render supplies the public HTTPS/WSS hostname after deployment.
- TLS is terminated by Render.

## Important
This project is only a WebSocket connectivity test. It is not a VLESS/Trojan server and does not provide proxy/VPN tunneling.

## Render
Deploy the repository as a Web Service using the included Dockerfile.
Optional environment variable:

`WS_PATH=/Telegram/@ABDO/ws`

After deployment:
- HTTP health check: `https://YOUR-SERVICE.onrender.com/`
- WebSocket: `wss://YOUR-SERVICE.onrender.com/Telegram/@ABDO/ws`
