const fs = require("fs");

console.log(JSON.parse(fs.readFileSync("./data.json", "utf-8")));
