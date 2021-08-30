configsaw
=======

A configuration library for JavaScript, by Kicksaw

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/configsaw.svg)](https://npmjs.org/package/configsaw)
[![Downloads/week](https://img.shields.io/npm/dw/configsaw.svg)](https://npmjs.org/package/configsaw)
[![License](https://img.shields.io/npm/l/configsaw.svg)](https://github.com/Kicksaw-Consulting/configsaw/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage

## CLI usage
<!-- usage -->
```sh-session
$ npm install -g configsaw
$ configsaw COMMAND
running command...
$ configsaw (-v|--version|version)
configsaw/0.0.0 win32-x64 node-v14.16.1
$ configsaw --help [COMMAND]
USAGE
  $ configsaw COMMAND
...
```
<!-- usagestop -->

## Library usage

To get the config as a dictionary with all secrets decrypted, import it like this

```typescript
import getConfig from 'configsaw'

const config = getConfig('prod')
```

Note: you'll need `ENC_KEY` in your environment variables, and it should
store the appropriate key with which you encrypted these secrets.

# Commands
<!-- commands -->
* [`configsaw make-secret`](#configsaw-make-secret)
* [`configsaw generate`](#configsaw-generate)
* [`configsaw upsert [KEY] [VALUE]`](#configsaw-upsert-key-value)
* [`configsaw reveal-secrets`](#configsaw-reveal-secrets)
* [`configsaw help [COMMAND]`](#configsaw-help-command)

## `configsaw make-secret`

Generates an encryption key intended for ENC_KEY in your environment variables

```
USAGE
  $ configsaw make-secret

OPTIONS
  -h, --help       show CLI help

EXAMPLE
  $ configsaw make-secret
  Your secret key is: 
  +v9hvoN0hB4USWQIl/+1MF6TOzPF8dVNOh3dgmqiRr4=
  Please use this to encrypt secrets in your intended configsaw-<env>.yml and store it somewhere safe
```

_See code: [src/commands/make-secret.ts](https://github.com/Kicksaw-Consulting/configsaw/blob/main/src/commands/make-secret.ts)_

## `configsaw generate`

Generates a config file for a given stage, if it doesn't already exist

```
USAGE
  $ configsaw generate

OPTIONS
  -e               the env name (defaults to dev)
  -h, --help       show CLI help

EXAMPLE
  $ configsaw generate -e prod
  configsaw-prod.yml generated successfully
```

_See code: [src/commands/generate.ts](https://github.com/Kicksaw-Consulting/configsaw/blob/main/src/commands/generate.ts)_

## `configsaw upsert [KEY] [VALUE]`

Upsert a configuration key-value pair to the environment's config file. Prepend
the key name with a _ if you'd like for it to be secret.

```
USAGE
  $ configsaw upsert [KEY] [VALUE]

OPTIONS
  -e               the env name (defaults to dev)
  -h, --help       show CLI help

EXAMPLE
  $ configsaw upsert USERNAME brno32 -e prod
  USERNAME added to configsaw-prod.yml successfully
  $ configsaw upsert _PASSWORD 123password -e prod
  _PASSWORD added to configsaw-prod.yml successfully
```

_See code: [src/commands/upsert.ts](https://github.com/Kicksaw-Consulting/configsaw/blob/main/src/commands/upsert.ts)_

## `configsaw reveal-secrets`

Reveal all of the secrets in an environment's configsaw file

```
USAGE
  $ configsaw reveal-secrets

OPTIONS
  -e               the env name (defaults to dev)
  -h, --help       show CLI help

EXAMPLE
  $ configsaw reveal-secrets -e prod
  _PASSWORD=123password
```

_See code: [src/commands/reveal-secrets.ts](https://github.com/Kicksaw-Consulting/configsaw/blob/main/src/commands/reveal-secrets.ts)_

## `configsaw help [COMMAND]`

display help for configsaw

```
USAGE
  $ configsaw help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.3/src/commands/help.ts)_
<!-- commandsstop -->
