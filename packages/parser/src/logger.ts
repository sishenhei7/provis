/* eslint-disable no-console */
import pico from 'picocolors'

class Logger {
  public log(msg: any) {
    console.warn(`${pico.underline(msg)}`)
  }

  public warn(msg: string) {
    console.warn(`${pico.bgYellow(pico.black(' WARN '))} ${pico.yellow(msg)}`)
  }

  public error(msg: string) {
    console.error(`${pico.bgRed(pico.black(' ERROR '))} ${pico.red(msg)}`)
  }

  public info(msg: string) {
    console.info(`${pico.bgGreen(pico.black(' INFO '))} ${pico.green(msg)}`)
  }

  public table(obj: unknown) {
    console.table(obj)
  }
}

export default new Logger()
