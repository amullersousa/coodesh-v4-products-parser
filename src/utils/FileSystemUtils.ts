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

  public static write(file: Buffer, outputPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        fs.writeFileSync(outputPath, file)
        return resolve(null)
      } catch (error) {
        return reject(error)
      }
    })
  }

  public static stream(filePath: string): Promise<fs.ReadStream> {
    return new Promise((resolve, reject) => {
      try {
        const stream = fs.createReadStream(filePath, { encoding: 'utf8' })
        return resolve(stream)
      } catch (error) {
        return reject(error)
      }
    })
  }
}
