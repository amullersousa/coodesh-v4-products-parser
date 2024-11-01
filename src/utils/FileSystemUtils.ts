import * as fs from 'fs'

export type FileSystemUtilsReadResponse = { [key: string]: any }

export class FileSystemUtils {
  public static read(path: string): Promise<FileSystemUtilsReadResponse> {
    return new Promise((resolve, reject) => {
      fs.readFile(path, 'utf-8', (error, data) => {
        if (error) {
          console.error('Erro ao ler o arquivo:', error)
          return reject(error)
        }
        return resolve(JSON.parse(data))
      })
    })
  }
}
