let fs = require("fs");

let str = fs.readFileSync("./convertable", "utf-8")
if(fs.existsSync("./converted")) fs.unlinkSync("./converted");

str = str.replace(/(?:\r\n|\r|\n)/g, "\\n");
str = str.replace(/(\s)\1{4}/g, "\\t");

fs.writeFileSync('./converted', str);