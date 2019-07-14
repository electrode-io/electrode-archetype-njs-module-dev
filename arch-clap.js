"use strict";
const Path = require("path");
const xsh = require("xsh");
const Fs = require("fs");
const unwrapNpmCmd = require("unwrap-npm-cmd");

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
  if (Fs.existsSync(customDir)) {
    eslintDir = customDir;
  }
}

checkCustomEslint();

const setupMocha = () => {
  const userFile = Path.resolve("test/mocha.opts");
  if (Fs.existsSync(userFile)) return;
  let archDir = Path.join(__dirname);
  archDir = xsh.pathCwd.remove(archDir);
  if (archDir.startsWith(Path.sep)) {
    archDir = archDir.substr(1);
  }
  const setupFile = Path.join(archDir, "config/test/setup.js");

  const mochaOpts = `--require ${setupFile}
--recursive
`;

  Fs.writeFileSync(userFile, mochaOpts);
  console.log(
    `INFO: Generated ${xsh.pathCwd.remove(userFile, "", true)} for you. You should commit it.`
  );
};

const tasks = {
  "lint-lib": `eslint -c ${eslintDir}/.eslintrc-node lib --color`,
  "lint-test": `eslint -c ${eslintDir}/.eslintrc-test test --color`,
  lint: [["lint-lib", "lint-test"]],
  test: [["lint-lib", "lint-test", "test-only"]],
  "test-only": {
    desc: "Run just your unit tests (generate test/mocha.opts if not exist)",
    task: () => {
      setupMocha();
      return ".test-only";
    }
  },
  ".test-only": `mocha -c test/spec`,
  ".test-cov": `nyc ${unwrapNpmCmd("clap", { jsOnly: true })} -q test-only`,
  "test-cov": {
    desc: "Use nyc to generate coverage for tests (add nyc config to your package.json)",
    task: () => {
      const userPkgFile = Path.resolve("package.json");
      const userPkg = require(userPkgFile);
      const nyc = userPkg.nyc || { all: true, reporter: [], exclude: [] };
      if (nyc.exclude.indexOf("*clap.js") < 0) {
        userPkg.nyc = nyc;
        nyc.all = true;
        Object.assign(nyc, {
          "check-coverage": true,
          statements: 100,
          branches: 100,
          functions: 100,
          lines: 100,
          cache: true
        });
        nyc.reporter = nyc.reporter.concat(["lcov", "text", "text-summary"]);
        nyc.exclude = nyc.exclude.concat(["coverage", "*clap.js", "gulpfile.js", "dist", "test"]);
        Fs.writeFileSync(userPkgFile, `${JSON.stringify(userPkg, null, 2)}\n`);
        console.log("INFO: added nyc config to your package.json.  You should commit it.");
      }
      return ".test-cov";
    }
  },
  "test-ci": ["test-cov"],
  check: ["lint", "test-cov"],
  "check-ci": ["lint", "test-ci"]
};

module.exports = function(xclap) {
  setupPath();
  process.env.FORCE_COLOR = "true";
  xclap = xclap || require("xclap");
  xclap.load("electrode", tasks);
};
