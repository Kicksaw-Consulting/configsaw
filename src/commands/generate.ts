import {Command, flags} from '@oclif/command'

import {dump} from 'js-yaml'
import * as fs from 'fs'

export default class Generate extends Command {
  static description = 'Generates a config file for a given stage, if it doesn\'t already exist'

  static flags = {
    help: flags.help({char: 'h'}),
    environment: flags.string({char: 'e', description: 'environment to create', default: 'dev'}),
  }

  async run() {
    const {flags} = this.parse(Generate)

    const filename = `confsaw-${flags.environment}.yml`

    fs.stat(filename, function (err, _) {
      if (err === null) {
        throw new Error(`${filename} already exists`)
      } else if (err.code === 'ENOENT') {
        // file does not exist
        const ymlString = dump({KEY: 'value'}, {
          sortKeys: false,
        })
        fs.writeFileSync(filename, ymlString)
      } else {
        // eslint-disable-next-line no-console
        console.error('Some other error: ', err.code)
      }
    })
  }
}
