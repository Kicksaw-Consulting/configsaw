import {Command, flags} from '@oclif/command'

import {dump} from 'js-yaml'
import * as fs from 'fs'

import {confFilenameFromEnv, fileExists} from '../utils/files'

export default class Generate extends Command {
  static description = 'Generates a config file for a given stage, if it doesn\'t already exist'

  static flags = {
    help: flags.help({char: 'h'}),
    environment: flags.string({char: 'e', description: 'environment to create', default: 'dev'}),
  }

  async run() {
    const {flags} = this.parse(Generate)

    const filename = confFilenameFromEnv(flags.environment)

    if (fileExists(filename)) {
      throw new Error(`${filename} already exists`)
    }

    const ymlString = dump({KEY: 'value'}, {
      sortKeys: false,
    })
    fs.writeFileSync(filename, ymlString)
    // eslint-disable-next-line no-console
    console.log(`${filename} generated successfully`)
  }
}
