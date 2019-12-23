const http = require("http"),
    fs = require("fs"),
    get_assets = require("./get.assets.prod"),
    contentful = require("contentful"),
    server = http.createServer(),
    dist = __dirname + "/dist";

var ctf = contentful.createClient({
    space: "egac4knf7iqn",
    accessToken: "3c84dff7474ac76b2007318be8a7bbed90d16ebb405ace8e1c4e288a082e1a25"
});
    
server.on("request", router);

function router(req, res) {
    let request = req.method + ' ' + req.url;
    console.log("==> REQUEST  - ", request);

    switch(request.split("?")[0]) {
        case "GET /":
            let index = fs.readFile(dist + "/index.html", "utf-8", (err, data) => {
                if(!err) return res.writeHead(200, {"Content-Type": "text/html"}).end(data);
                return res.writeHead(400).end();
            });
            break;
        case "GET /cms":         
            get_assets(ctf, parseQuery(request), res);
            break;
        default: 
            static(request, res);
            break;
    }
}

function static(request, res) {
    let mimes = {
            ".html": "text/html",
            ".css": "text/css",
            ".js": "application/javascript",
            ".png": "image/png",
            ".otf": "application/x-font-opentype"
        },
        filename = request.substring(request.indexOf("/"));
    if(fs.existsSync(dist + filename)) {
        let file = fs.readFileSync(dist + filename);
        res.writeHead(200, {"Content-Type": mimes[request.substring(request.indexOf("."))]}).end(file);
    } else {
        res.writeHead(404).end("Nothing here!\n");
    }
}

function parseQuery(qstr) {
    let queryDict = {},
        q = qstr.split("?")[1].split("&");
    for(let i of q) {
        queryDict[i.split("=")[0]] = i.split("=")[1];
    }
    return queryDict;
}

server.listen(9000, () => {
    console.log("Starting NodeJS Server")
});