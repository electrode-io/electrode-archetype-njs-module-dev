# Archetype: NodeJS Module (Development)

A Walmart Labs flavored NodeJS Module archetype.

## Installation

Within your project, run:

```sh
$ npm install --save-dev electrode-archetype-njs-module-dev
```

Add a `clap.js` with the following code:

```js
require("electrode-archetype-njs-module-dev")();
```

You need to install `xclap-cli` globally for the `clap` command to invoke the build tasks:

```sh
$ npm install -g xclap-cli
```

Run `clap` to see a list of tasks.

## Project Structure

This archetype assumes a directory structure as follows:

```
.gitignore
package.json

lib/
  index.js

test/
  spec/**
    *.spec.js
```

Built with :heart: by [Team Electrode](https://github.com/orgs/electrode-io/people) @WalmartLabs.

[xclap-cli]: https://www.npmjs.com/package/xclap-cli
