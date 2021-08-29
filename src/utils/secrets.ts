import * as crypto from 'crypto'

const encrypt = (message: string) => {
  const algorithm = 'aes256' // or any other algorithm supported by OpenSSL
  const encryptionKey = process.env.ENC_KEY

  if (!encryptionKey) {
    throw new Error('ENC_KEY must be defined in your environment variables')
  }

  // eslint-disable-next-line node/no-deprecated-api
  const cipher = crypto.createCipher(algorithm, encryptionKey)
  const encrypted = cipher.update(message, 'utf8', 'hex') + cipher.final('hex')

  // eslint-disable-next-line no-console
  console.log(encrypted)

  return encrypted
}

const decrypt = (encryptedMessage: string) => {
  const algorithm = 'aes256' // or any other algorithm supported by OpenSSL
  const encryptionKey = process.env.ENC_KEY

  if (!encryptionKey) {
    throw new Error('ENC_KEY must be defined in your environment variables')
  }

  // eslint-disable-next-line node/no-deprecated-api
  const decipher = crypto.createDecipher(algorithm, encryptionKey)
  const decrypted = decipher.update(encryptedMessage, 'hex', 'utf8') + decipher.final('utf8')

  // eslint-disable-next-line no-console
  console.log(decrypted)

  return decrypted
}

export {decrypt, encrypt}
