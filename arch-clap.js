"use strict";
const Path = require("path");
const xsh = require("xsh");
const fs = require("fs");

if (process.argv[1].indexOf("gulp") >= 0) { 
  const cmd = `clap ${process.argv.slice(2).join(" ")}`; 
  console.log(`\nPlease use clap to run archetype commands.`); 
  console.log(`\nie:  ${cmd}`); 
  const icmd = `'npm i -g xclap-cli'`; 
  console.log(`\nIf you haven't done so, please run ${icmd}\n`); 
  process.exit(1); 
} 

function setupPath() {
  xsh.envPath.addToFront(Path.resolve("node_modules/.bin"));
  xsh.envPath.addToFront(Path.join(__dirname, "node_modules/.bin"));
}

let eslintDir = `${__dirname}/config/eslint`;
function checkCustomEslint() {
  const customDir = Path.resolve("eslint");
  if (fs.existsSync(customDir)) {
    eslintDir = customDir;
  }
}

checkCustomEslint();

const tasks = {
  "lint-lib": `eslint -c ${eslintDir}/.eslintrc-node lib --color`,
  "lint-test": `eslint -c ${eslintDir}/.eslintrc-test test --color`,
  "lint": [["lint-lib", "lint-test"]],
  "test": [["lint-lib", "lint-test", "test-only"]],
  "test-only": `mocha -c --opts ${__dirname}/config/test/mocha.opts test/spec`,
  "test-cov": `nyc --all --reporter=lcov --reporter=text --reporter=text-summary -x coverage -x \"*clap.js\" -x gulpfile.js -x dist -x test clap test-only`,
  "test-ci": ["test-cov"],
  "check": ["lint", "test-cov"],
  "check-ci": ["lint", "test-ci"]
};

module.exports = function (xclap) {
  setupPath();
  process.env.FORCE_COLOR = "true";
  xclap = xclap || require("xclap");
  xclap.load("electrode", tasks);
};
