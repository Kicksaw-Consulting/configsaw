import * as fs from 'fs'

import {load} from 'js-yaml'

type configsawConfig =  {[key: string]: string}

const fileExists = (filename: string) => {
  try {
    const statsObj = fs.statSync(filename)
    return statsObj.isFile()
  } catch {
    return false
  }
}

const confFilenameFromEnv = (env: string) => {
  return `configsaw-${env}.yml`
}

const readYml = (filename: string) => {
  const fileContents = fs.readFileSync(filename)
  const data = load(fileContents.toString()) as configsawConfig
  return data
}

export {fileExists, confFilenameFromEnv, readYml}
