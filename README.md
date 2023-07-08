# Nodejs-Reverse-Proxy
### The node-http-proxy module docs can be confusing for beginngers, so I made these simple proxies.

## Installation
#### I assume you are familiar with the command line, nodejs, and nvm. But here's some help if you need it
1. Install `nodejs` and `npm`
1. Clone this repo & switch to the project directory:
```sh
git clone https://github.com/bauchdj/Nodejs-Reverse-Proxy.git && cd Nodejs-Reverse-Proxy
```
3. Install node modules:
```sh
npm install
```
4. You're all ready to go for an HTTP proxy! `node http-proxy.js` will start the simple proxy. Read usage for setup.
However, HTTPS requires you generate a key and cert (LetsEncrypt is free). If you don't know what I'm talking about you have a little researching to do. Then add the key and cert to `https-proxy.js`.

#### Usage
The HTTPS proxy is the personal proxy I wrote to filter requests by `subdomain` and redirects to `127.0.0.1:${targetPort}`. The targetPort depends on the subdomain.

This includes `websocket` upgrading. Luckily, that's super easy with node-http-proxy :)

The HTTP Proxy essentially connects two ports. Traffic from the proxy goes to `127.0.0.1:${targetPort}`

I recommend you look at [node-http-proxy](https://github.com/http-party/node-http-proxy). Especially the [options object](https://github.com/http-party/node-http-proxy/blob/master/lib/http-proxy.js#L26-L42) you can pass in.

#### Setup
Edit the script to change proxy `proxyPort` and default `targetPort`. 
- Ports `80` and `443` require sudo / administrator permissions
- `Port forwarding` 80 and/or 443 requires additional setup on your router. This redirects all incoming traffic from a port on the router to the ip address and port you specify. For example, 443 can port forward to the ip address 192.168.1.100 on port 8080. It is recommended you setup a `static ip address` (instead of DHCP) since the port forwarding rule depends on the devices ip address not changing.
```sh
node http-proxy.js
```

## Issues/Suggestions
Report issues or suggestions to the *Issues* tab on the [GitHub page](https://github.com/bauchdj/Nodejs-Reverse-Proxy).

## License
There is no waranty. Code responsibly. If you copy a significant amount of my code feel free to credit me. My scripts are pretty simple tbh.
