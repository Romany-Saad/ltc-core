const fs = require("fs");
const path = require("path");

const partials = [];

for(let i=0; i<3;i++){
  partials.push(fs.readFileSync(path.resolve(__dirname, `./schema.partial.${i}.graphql`),{encoding: "utf8"}))
}

module.exports = partials;
