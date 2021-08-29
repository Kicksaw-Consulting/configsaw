import * as crypto from 'crypto'

const ivFromEncKey = (encKey: string) => {
  if (encKey.length < 5) {
    throw new Error('Your ENC_KEY must be at least 5 characters long')
  }
  return encKey.substring(0, 5)
}

const encrypt = (message: string) => {
  const algorithm = 'aes256'
  const encryptionKey = process.env.ENC_KEY

  if (!encryptionKey) {
    throw new Error('ENC_KEY must be defined in your environment variables')
  }

  const iv = ivFromEncKey(encryptionKey)

  const cipher = crypto.createCipheriv(algorithm, encryptionKey, iv)
  const encrypted = cipher.update(message, 'utf8', 'hex') + cipher.final('hex')

  return encrypted
}

const decrypt = (encryptedMessage: string) => {
  const algorithm = 'aes256'
  const encryptionKey = process.env.ENC_KEY

  if (!encryptionKey) {
    throw new Error('ENC_KEY must be defined in your environment variables')
  }

  const iv = ivFromEncKey(encryptionKey)

  // eslint-disable-next-line node/no-deprecated-api
  const decipher = crypto.createDecipheriv(algorithm, encryptionKey, iv)
  const decrypted = decipher.update(encryptedMessage, 'hex', 'utf8') + decipher.final('utf8')

  return decrypted
}

export {decrypt, encrypt}
