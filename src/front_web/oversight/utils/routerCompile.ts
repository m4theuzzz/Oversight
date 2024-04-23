import { compile } from 'path-to-regexp'

export const pathToUrl = <T extends object>(path: string, params: T) => {
  let resUrl

  try {
    resUrl = compile(path)(params)
  } catch {
    resUrl = ''
  }

  return resUrl
}
