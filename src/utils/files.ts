import * as fs from 'fs'

const fileExists = (filename: string) => {
  try {
    const statsObj = fs.statSync(filename)
    return statsObj.isFile()
  } catch {
    return false
  }
}

const confFilenameFromEnv = (env: string) => {
  return `confsaw-${env}.yml`
}

export {fileExists, confFilenameFromEnv}
