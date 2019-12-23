module.exports = (ctf, req, res) => {
    let mapper = require("./content.hooks");

    if(req.query.pageName) {
        ctf.getEntry(mapper[req.query.pageName])
            .then(data => {
                res.send({
                    "entry": data,
                    "error": null,
                    "message": "Successfully fetched entry."
                });
            })
            .catch(err => {
                res.send({
                    "entry": null,
                    "error": err,
                    "message": "Failed to fetch entry!"
                });
            });
    } else {
        res.send({
            "entry": null,
            "error": new Error("Could not get entry"),
            "message": "Failed to fetch entry!"
        });
    }
}