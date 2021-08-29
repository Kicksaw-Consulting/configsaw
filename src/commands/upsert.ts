import {Command, flags} from '@oclif/command'

import {dump} from 'js-yaml'
import * as fs from 'fs'

import {confFilenameFromEnv} from '../utils/files'
import {encrypt} from '../utils/secrets'

export default class Generate extends Command {
  static description = 'Upsert a secret to the environment\'s config file'

  static args = [
    {name: 'secretName', required: true},
    {name: 'secretValue', required: true},
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    secret: flags.boolean({char: 's', default: false}),
    environment: flags.string({char: 'e', description: 'environment to add the secret to', default: 'dev'}),
  }

  async run() {
    const {args, flags} = this.parse(Generate)

    const filename = confFilenameFromEnv(flags.environment)

    const rawValue = args.secretValue

    const secretObj = flags.secret ? {[`_${args.secretName}`]: encrypt(rawValue)} : {[args.secretName]: rawValue}

    const ymlString = dump(secretObj, {
      sortKeys: false,
    })
    fs.appendFileSync(filename, ymlString)
    // eslint-disable-next-line no-console
    console.log(`${filename} generated successfully`)
  }
}
