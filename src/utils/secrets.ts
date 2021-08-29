import {promisify} from 'util'

import * as crypto from 'crypto'

const algorithm = 'aes-256-ctr'

const makeEncKey = async () => {
  const makeRandomBytes = promisify(crypto.randomBytes)
  const buffer = await makeRandomBytes(32)
  const token = buffer.toString('base64')
  return token
}

const encrypt = (message: string) => {
  const encryptionKey = process.env.ENC_KEY

  if (!encryptionKey) {
    throw new Error('ENC_KEY must be defined in your environment variables')
  }

  const encKey = Buffer.from(encryptionKey, 'base64')

  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(algorithm, encKey, iv)
  let encrypted = cipher.update(message)
  encrypted = Buffer.concat([encrypted, cipher.final()])
  return iv.toString('hex') + ':' + encrypted.toString('hex')
}

const decrypt = (encryptedMessage: string) => {
  const encryptionKey = process.env.ENC_KEY

  if (!encryptionKey) {
    throw new Error('ENC_KEY must be defined in your environment variables')
  }

  const textParts = encryptedMessage.split(':')
  const ivString = textParts.shift()
  if (!ivString) {
    throw new Error('Corrupted value')
  }
  const iv = Buffer.from(ivString, 'hex')
  const encryptedText = Buffer.from(textParts.join(':'), 'hex')
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(encryptionKey, 'base64'), iv)
  let decrypted = decipher.update(encryptedText)
  decrypted = Buffer.concat([decrypted, decipher.final()])
  return decrypted.toString()
}

export {decrypt, encrypt, makeEncKey}
