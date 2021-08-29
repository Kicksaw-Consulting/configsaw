confsaw
=======

A configuration library for JavaScript, by Kicksaw

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/confsaw.svg)](https://npmjs.org/package/confsaw)
[![Downloads/week](https://img.shields.io/npm/dw/confsaw.svg)](https://npmjs.org/package/confsaw)
[![License](https://img.shields.io/npm/l/confsaw.svg)](https://github.com/Kicksaw-Consulting/confsaw/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage

## CLI usage
<!-- usage -->
```sh-session
$ npm install -g confsaw
$ confsaw COMMAND
running command...
$ confsaw (-v|--version|version)
confsaw/0.0.0 win32-x64 node-v14.16.1
$ confsaw --help [COMMAND]
USAGE
  $ confsaw COMMAND
...
```
<!-- usagestop -->

## Library usage

To get the config as a dictionary with all secrets decrypted, import it like this

```typescript
import getConfig from 'confsaw'

const config = getConfig('prod')
```

Note: you'll need `ENC_KEY` in your environment variables, and it should
store the appropriate key with which you encrypted these secrets.

# Commands
<!-- commands -->
* [`confsaw make-secret`](#confsaw-make-secret)
* [`confsaw generate`](#confsaw-generate)
* [`confsaw upsert [KEY] [VALUE]`](#confsaw-upsert-key-value)
* [`confsaw reveal-secrets`](#confsaw-reveal-secrets)
* [`confsaw help [COMMAND]`](#confsaw-help-command)

## `confsaw make-secret`

Generates an encryption key intended for ENC_KEY in your environment variables

```
USAGE
  $ confsaw make-secret

OPTIONS
  -h, --help       show CLI help

EXAMPLE
  $ confsaw make-secret
  Your secret key is: 
  +v9hvoN0hB4USWQIl/+1MF6TOzPF8dVNOh3dgmqiRr4=
  Please use this to encrypt secrets in your intended confsaw-<env>.yml and store it somewhere safe
```

_See code: [src/commands/make-secret.ts](https://github.com/Kicksaw-Consulting/confsaw/blob/main/src/commands/make-secret.ts)_

## `confsaw generate`

Generates a config file for a given stage, if it doesn't already exist

```
USAGE
  $ confsaw generate

OPTIONS
  -e               the env name (defaults to dev)
  -h, --help       show CLI help

EXAMPLE
  $ confsaw generate -e prod
  confsaw-prod.yml generated successfully
```

_See code: [src/commands/generate.ts](https://github.com/Kicksaw-Consulting/confsaw/blob/main/src/commands/generate.ts)_

## `confsaw upsert [KEY] [VALUE]`

Upsert a configuration key-value pair to the environment's config file. Prepend
the key name with a _ if you'd like for it to be secret.

```
USAGE
  $ confsaw upsert [KEY] [VALUE]

OPTIONS
  -e               the env name (defaults to dev)
  -h, --help       show CLI help

EXAMPLE
  $ confsaw upsert USERNAME brno32 -e prod
  USERNAME added to confsaw-prod.yml successfully
  $ confsaw upsert _PASSWORD 123password -e prod
  _PASSWORD added to confsaw-prod.yml successfully
```

_See code: [src/commands/upsert.ts](https://github.com/Kicksaw-Consulting/confsaw/blob/main/src/commands/upsert.ts)_

## `confsaw reveal-secrets`

Reveal all of the secrets in an environment's confsaw file

```
USAGE
  $ confsaw reveal-secrets

OPTIONS
  -e               the env name (defaults to dev)
  -h, --help       show CLI help

EXAMPLE
  $ confsaw reveal-secrets -e prod
  _PASSWORD=123password
```

_See code: [src/commands/reveal-secrets.ts](https://github.com/Kicksaw-Consulting/confsaw/blob/main/src/commands/reveal-secrets.ts)_

## `confsaw help [COMMAND]`

display help for confsaw

```
USAGE
  $ confsaw help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.3/src/commands/help.ts)_
<!-- commandsstop -->
