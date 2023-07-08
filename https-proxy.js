const https = require('https');
const httpProxy = require('http-proxy');
const fs = require('fs');

const proxyPort = 443;
const targetHost = '127.0.0.1';

// Edit these properties to load cert and key. If you use letsencrypt you might be able to replace "DOMAIN" in the file paths.
const options = {
  cert: fs.readFileSync('/etc/letsencrypt/live/DOMAIN/fullchain.pem'),
  key: fs.readFileSync('/etc/letsencrypt/live/DOMAIN/privkey.pem')
};

const getTargetPort = req => { // Gets port based on subdomain
  if (!req.headers.host) { // This is for debugging. No header.host means no subdomain :(
    console.log(JSON.stringify(req.headers));
    return null;
  }
  const subdomain = req.headers.host.split('.')[0];
  // Edit the subdomain cases and the returned port. Pretty simple.
  switch (subdomain) {
    case 'www':
      return 8080;
    case 'meet':
      return 3000;
    default:
      return null; //results in status Code 403, Forbidden
  }
}

// Create a proxy server instance
const proxy = httpProxy.createProxyServer({
  ws: true, // Enable WebSocket proxying
});

proxy.on('error', (err, req, res) => { // Error event listener
  console.error('Proxy error:', err);
  res.statusCode = 500;
  res.end('Something went wrong.');
});

const setHeaderRemoteAddress = (req) => { // Set the client's IP address in the X-Forwarded-For header
  req.headers['x-forwarded-for'] = req.connection.remoteAddress;
}

// Create an HTTPS server
const server = https.createServer(options, (req, res) => {
  const targetPort = getTargetPort(req);
  if (targetPort === null) { // If targetPort is null, refuse the connection
    res.statusCode = 403;
    res.end('Forbidden');
    return;
  };
  setHeaderRemoteAddress(req);
  proxy.web(req, res, { target: `http://${targetHost}:${targetPort}` });
});

server.on('upgrade', (req, socket, head) => { // Websocket upgrade event listener
  const targetPort = getTargetPort(req);
  setHeaderRemoteAddress(req);
  proxy.ws(req, socket, head, { target: `ws://${targetHost}:${targetPort}` });
});

server.listen(proxyPort, () => { // Start the server
  console.log(`Proxy server listening on port ${proxyPort}`);
});
