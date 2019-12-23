module.exports = (ctf, req, res) => {
    let mapper = require("./content.hooks");

    if(req.pageName) {
        ctf.getEntry(mapper[req.pageName])
            .then(data => {
                res.writeHead(200, {"Content-Type": "application/json"}).end(JSON.stringify({
                    "entry": data,
                    "error": null,
                    "message": "Successfully fetched entry."
                }));
            })
            .catch(err => {
                res.writeHead(200, {"Content-Type": "application/json"}).end(JSON.stringify({
                    "entry": null,
                    "error": err,
                    "message": "Failed to fetch entry!"
                }));
            });
    } else {
        res.writeHead(200, {"Content-Type": "application/json"}).end(JSON.stringify({
            "entry": null,
            "error": new Error("Could not get entry"),
            "message": "Failed to fetch entry!"
        }));
    }
}