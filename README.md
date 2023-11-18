# Nodejs-Reverse-Proxy
#### The node-http-proxy module docs can be confusing for beginngers, so I made 3 different proxy scripts any one could run and learn from.

## Installation
#### I assume you are familiar with the command line, nodejs, and npm. But here's some help if you need it
1. Install `nodejs` and `npm`
1. Clone this repo & switch to the project directory:
```sh
git clone https://github.com/bauchdj/Nodejs-Reverse-Proxy.git && cd Nodejs-Reverse-Proxy
```
3. Install node modules:
```sh
npm install
```
4. You should read the [setup](#setup) first. But if you want, run `node http-proxy.js`. It might fail if you have other services running on those ports.

## Setup
Edit the script to change proxy the `proxyPort` and `targetPort`. For a super simple proxy, just update the port you want the proxy to run on and the port you're proxying to.

Running on port `80` or `443` requires sudo / administrator permissions.

`Port forwarding` 80 and/or 443 requires additional setup on your router. This redirects all incoming traffic from a port on the router to the ip address and port you specify. For example, 443 can port forward to the ip address 192.168.1.100 on port 8080. It is recommended you setup a `static ip address` (instead of DHCP) since the port forwarding rule depends on the devices ip address not changing.

In order to run `HTTPS` you need to meet HTTPS requirements. You need a signed key and cert (LetsEncrypt is free service for this). If you don't know what I'm talking about you have a little researching to do. Once you get a key and cert you need to add their respective file paths to `https-proxy.js`.

**Dev Note:**

- You can generate a key and cert locally for localhost development and your data will be encrypted, however the browser will not recognize your cert as safe because it is not signed by a Trusted Certificate Authority.

After setup run:
```sh
node http-proxy.js
```
Or `node https-proxy.js`

## Usage
The `HTTP` Proxy essentially connects two ports. Traffic from the proxy goes to `http://${targetHost}:${targetPort}` with `targetHost = '127.0.0.1'`. Websocket upgrade is enabled. 

The `HTTPS` proxy is the personal proxy I wrote to filter requests by subdomain and redirects to `http://${targetHost}:${targetPort}` with `targetHost = '127.0.0.1'`. The `getTargetPort()` fn determines the `targetPort` based on the `subdomain`. The proxy also includes `websocket` upgrade. Luckily, that's super easy with node-http-proxy :)

I recommend you look at [node-http-proxy](https://github.com/http-party/node-http-proxy). Especially the [options object](https://github.com/http-party/node-http-proxy/blob/master/lib/http-proxy.js#L26-L42) you can pass in.

## Issues/Suggestions
Report issues or suggestions to the [Issues tab](https://github.com/bauchdj/Nodejs-Reverse-Proxy/issues).

## License
There is no waranty. Code responsibly. If you copy a significant amount of my code feel free to credit me. My scripts are pretty simple tbh.
