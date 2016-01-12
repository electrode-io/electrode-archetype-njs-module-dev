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
src/
  index.js
.builderrc
.npmrc
.gitignore
test/
package.json
```

## Tasks

```
$ builder help electrode-archetype-hapi-plugin

[builder:help]

Usage:

  builder <action> <task(s)>

Actions:

  help, run, concurrent, envs

Flags: General

  --builderrc: Path to builder config file (default: `.builderrc`)

Tasks:

  cov
    [@walmart/electrode-archetype-hapi-plugin] istanbul cover mocha test/*

  lint
    [@walmart/electrode-archetype-hapi-plugin] builder concurrent lint-src lint-test

  lint-src
    [@walmart/electrode-archetype-hapi-plugin] eslint --ext .js -c ./node_modules/@walmart/electrode-archetype-hapi-plugin/config/eslint/.eslintrc-node src test --color

  lint-test
    [@walmart/electrode-archetype-hapi-plugin] eslint --ext .js -c ./node_modules/@walmart/electrode-archetype-hapi-plugin/config/eslint/.eslintrc-test test --color

  test
    [@walmart/electrode-archetype-hapi-plugin] mocha test/*
```

[builder]: https://github.com/FormidableLabs/builder
