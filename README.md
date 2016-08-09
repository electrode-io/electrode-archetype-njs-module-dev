# Archetype: NodeJS Module (Development)

A Walmart Labs flavored NodeJS Module archetype.

## Installation

Within your project, run:

```sh
$ npm install --save-dev electrode-archetype-njs-module-dev
```

Add a `gulpfile.js` with the following code:

```js
require("electrode-archetype-njs-module-dev")();
```

You need to install `gulp` globally to invoke the build tasks:

```sh
$ npm install -g gulp
```

Run `gulp` to see a list of tasks.

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


