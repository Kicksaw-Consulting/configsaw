import {Command} from '@oclif/command'

import {makeEncKey} from '../utils/secrets'

export default class Generate extends Command {
  static description = 'Generates an encryption key intended for ENC_KEY in your environment variables'

  async run() {
    // eslint-disable-next-line no-console
    console.log('Your secret key is: ')
    const encKey = await makeEncKey()
    // eslint-disable-next-line no-console
    console.log(encKey)
    // eslint-disable-next-line no-console
    console.log('Please use this to encrypt secrets in your intended confsaw-<env>.yml and store it somewhere safe')
  }
}
