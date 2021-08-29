import {Command, flags} from '@oclif/command'

import {dump} from 'js-yaml'
import * as fs from 'fs'

import {confFilenameFromEnv, fileExists} from '../utils/files'
import {encrypt} from '../utils/secrets'

import {getConfig} from '../lib'

export default class Generate extends Command {
  static description = 'Upsert a configuration key-value pair to the environment\'s config file'

  static args = [
    {name: 'key', required: true},
    {name: 'value', required: true},
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    environment: flags.string({char: 'e', description: 'environment to add the secret to', default: 'dev'}),
  }

  async run() {
    const {args, flags} = this.parse(Generate)

    const filename = confFilenameFromEnv(flags.environment)

    const rawValue = args.value

    const confValueName: string = args.key
    const confValueValue: string = confValueName.startsWith('_') ? encrypt(rawValue) : rawValue

    const newConfgValue = {[confValueName]: confValueValue}

    const config = fileExists(filename) ? {...getConfig(flags.environment), ...newConfgValue} : newConfgValue

    const ymlString = dump(config, {
      sortKeys: false,
    })
    fs.writeFileSync(filename, ymlString)
    // eslint-disable-next-line no-console
    console.log(`${confValueName} added to ${filename} successfully`)
  }
}
