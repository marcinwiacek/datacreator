//formatted with js-beautify -e "\n" requestor.js > x

const crypto = require('crypto');
const fs = require('fs');
const http2 = require('http2');
const path = require('path');
const url = require('url');
const zlib = require('zlib');

const version = "20250601";
const hostname = '127.0.0.1';
const port = 3000;

function readFileContentSync(fileName, callback) {
    //FIXME: checking if path is going out
    if (callback) {
        fs.readFile(path.normalize(__dirname + fileName), 'utf8', (err, data) => {
            if (err) {
                callback("");
            } else if (data.charCodeAt(0) == 65279) {
                callback(data.substring(1));
            } else {
                callback(data);
            }
        });
    } else {
        const x = fs.readFileSync(path.normalize(__dirname + fileName), 'utf8');
        return (x.charCodeAt(0) == 65279) ? x.substring(1) : x;
    }
}

function sendBody(req, res, text) {
    res.statusCode = 200;
    if (req.headers['accept-encoding'] && req.headers['accept-encoding'].includes('gzip')) {
        res.setHeader('Content-Encoding', 'gzip');
        res.end(zlib.gzipSync(text));
    } else if (req.headers['accept-encoding'] && req.headers['accept-encoding'].includes('deflate')) {
        res.setHeader('Content-Encoding', 'deflate');
        res.end(zlib.deflateSync(text));
    } else {
        res.end(text);
    }
}

function sendHTML(req, res, text) {
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    sendBody(req, res, text);
}

const onRequestHandler = async (req, res) => {
    if (req.method === 'GET') {
        const params = url.parse(req.url, true).query;
    } else if (req.headers['content-type'] == "application/x-www-form-urlencoded") { // POST
        return;
    }

    jsonObj = JSON.parse(readFileContentSync("/data.json"));

    sendHTML(req, res, "<html><head></head><body>it works</body></html>");
};

http2.createSecureServer({
    key: fs.readFileSync(__dirname + '/localhost-privkey.pem'),
    cert: fs.readFileSync(__dirname + '/localhost-cert.pem')
}, onRequestHandler).listen(port, hostname, async () => {
    console.log(`Server running at https://${hostname}:${port}/, Node.js ` + process.version);
});
