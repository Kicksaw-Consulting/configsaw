import {fileExists, confFilenameFromEnv, readYml} from './utils/files'
import {decrypt} from './utils/secrets'

const getConfig = (env: string) => {
  const filename = confFilenameFromEnv(env)

  if (!fileExists(filename)) {
    throw new Error(`${filename} does not exist`)
  }

  const data = readYml(filename)

  // eslint-disable-next-line guard-for-in
  for (const key in data) {
    if (key.startsWith('_')) {
      const decryptedValue = decrypt(data[key])
      data[key] = decryptedValue
    }
  }

  return data
}

export {getConfig}
