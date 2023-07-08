const httpProxy = require('http-proxy'),
      listen = 8000,
      target = 8080;
httpProxy.createProxyServer({ target:'http://localhost:' + target }).listen(listen);
console.log(`Listening ${listen}: targeting ${target}`);

// Below is a one liner equivalent without the console.log. Yes, it can be that simple.
// require('http-proxy').createProxyServer({target:'http://localhost:8080'}).listen(8000);
