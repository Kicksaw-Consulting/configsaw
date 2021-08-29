confsaw
=======

A configuration library for JavaScript, by Kicksaw

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/confsaw.svg)](https://npmjs.org/package/confsaw)
[![Downloads/week](https://img.shields.io/npm/dw/confsaw.svg)](https://npmjs.org/package/confsaw)
[![License](https://img.shields.io/npm/l/confsaw.svg)](https://github.com/Kicksaw-Consulting/confsaw/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
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
# Commands
<!-- commands -->
* [`confsaw hello [FILE]`](#confsaw-hello-file)
* [`confsaw help [COMMAND]`](#confsaw-help-command)

## `confsaw hello [FILE]`

describe the command here

```
USAGE
  $ confsaw hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ confsaw hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/Kicksaw-Consulting/confsaw/blob/v0.0.0/src/commands/hello.ts)_

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
