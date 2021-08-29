import {Command, flags} from '@oclif/command'

import {confFilenameFromEnv, readYml} from '../utils/files'
import {decrypt} from '../utils/secrets'

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
      const data = readYml(filename)

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
