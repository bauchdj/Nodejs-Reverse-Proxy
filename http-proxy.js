const http = require('http');
const httpProxy = require('http-proxy');
const fs = require('fs');

const proxyPort = 8000;
const targetHost = '127.0.0.1';
const targetPort = process.argv[2] || 8080;

// Create a proxy server instance
const proxy = httpProxy.createProxyServer({
  ws: true, // Enable WebSocket proxying
});

proxy.on('error', (err, req, res) => { // Error event listener
  console.error('Proxy error:', err);
  res.statusCode = 500;
  res.end('Something went wrong.');
});

const server = http.createServer((req, res) => {
  proxy.web(req, res, { target: `http://${targetHost}:${targetPort}` });
});

server.on('upgrade', (req, socket, head) => { // Websocket upgrade event listener
  proxy.ws(req, socket, head, { target: `ws://${targetHost}:${targetPort}` });
});

server.listen(proxyPort, () => { // Start the server
  console.log(`Proxy server listening on port ${proxyPort}, targeting ${targetPort}`);
});
