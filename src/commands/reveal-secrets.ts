import {Command, flags} from '@oclif/command'

import {load} from 'js-yaml'
import * as fs from 'fs'

import {confFilenameFromEnv} from '../utils/files'
import {decrypt} from '../utils/secrets'

type confsawConfig =  {[key: string]: string}

export default class RevealSecrets extends Command {
  static description = 'Reveal all of the secrets in an environment\'s config file'

  static flags = {
    help: flags.help({char: 'h'}),
    environment: flags.string({char: 'e', description: 'environment to add the secret to', default: 'dev'}),
  }

  async run() {
    const {flags} = this.parse(RevealSecrets)

    const filename = confFilenameFromEnv(flags.environment)

    try {
      const fileContents = fs.readFileSync(filename)
      const data = load(fileContents.toString()) as confsawConfig

      // eslint-disable-next-line guard-for-in
      for (const key in data) {
        if (key.startsWith('_')) {
          const decryptedValue = decrypt(data[key])
          // eslint-disable-next-line no-console
          console.log(`${key}=${decryptedValue}`)
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }
}
