# Builder Archetype: Hapi Plugin

A Walmart Labs flavored Hapi Plugin archetype for [builder][].

## Installation

If you want to use `builder` as a CLI tool (recommended), follow the instructions at [formidablelabs/builder to modify your `PATH`](https://github.com/formidablelabs/builder#local-install)

Within your project, run:

```bash
$ npm install --save builder @walmart/electrode-archetype-hapi-plugin
$ npm install --save-dev @walmart/electrode-archetype-hapi-plugin-dev
```

Add a `.builderrc` that contains the following:

```yaml
---
archetypes:
  - "@walmart/electrode-archetype-hapi-plugin"
```

## Project Structure

This archetype assumes an architecture as follows:

```
.builderrc
.npmrc
.gitignore
package.json

src/
  index.js

test/
  spec/**
    *.spec.js
```

## Tasks

```
$ builder help @walmart/electrode-archetype-hapi-plugin

[builder:help]

Usage:

  builder <action> <task(s)>

Actions:

  help, run, concurrent, envs

Flags: General

  --builderrc: Path to builder config file (default: `.builderrc`)

Tasks:

  check
    [@walmart/electrode-archetype-hapi-plugin] builder run lint && builder run test-cov

  check-ci
    [@walmart/electrode-archetype-hapi-plugin] builder run lint && builder run test-ci

  lint
    [@walmart/electrode-archetype-hapi-plugin] builder concurrent lint-src lint-test

  lint-src
    [@walmart/electrode-archetype-hapi-plugin] eslint -c node_modules/@walmart/electrode-archetype-hapi-plugin/config/eslint/.eslintrc-node src --color

  lint-test
    [@walmart/electrode-archetype-hapi-plugin] eslint -c node_modules/@walmart/electrode-archetype-hapi-plugin/config/eslint/.eslintrc-test test --color

  test
    [@walmart/electrode-archetype-hapi-plugin] mocha -c --opts node_modules/@walmart/electrode-archetype-hapi-plugin/config/test/mocha.opts test/spec

  test-ci
    [@walmart/electrode-archetype-hapi-plugin] builder run test-cov

  test-cov
    [@walmart/electrode-archetype-hapi-plugin] istanbul cover mocha -- -c --opts node_modules/@walmart/electrode-archetype-hapi-plugin/config/test/mocha.opts test/spec
```

[builder]: https://github.com/FormidableLabs/builder
