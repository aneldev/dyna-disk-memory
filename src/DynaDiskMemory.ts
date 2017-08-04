/// <reference path="../node_modules/@types/node/index.d.ts" />
declare const escape: any;

const fs = require('fs');
const path = require('path');
const rmdir = require('rimraf');

export interface ISettings {
  fragmentSize?: number;
  diskPath: string;
}

interface IFolderFile {
  full: string;
  folder: string;
  file: string;
}

export class DynaDiskMemory {
  constructor(settings: ISettings) {
    this._settings = {
      fragmentSize: 13,
      ...settings
    };

    if (settings.diskPath[settings.diskPath.length - 1] !== '/') this._settings.diskPath += '/'
  }

  private _settings: ISettings;

  public set(container: string, key: string, data: any): Promise<undefined> {
    return this._saveFile(container, key, data);
  }

  public get(container: string, key: string): Promise<any> {
    return this._loadFile(container, key);
  }

  public del(container: string, key: string): Promise<any> {
    return new Promise((resolve: Function, reject: (error: any) => void) => {
      this._generateFilename(container, key)
        .then((fileNames_: IFolderFile) => {
          const fileName: string = fileNames_.full;
          fs.unlink(fileName, function (err: any) {
            err && reject(err) || resolve();
          });
        })
        .catch(reject);
    });
  }

  public delContainer(container: string): Promise<undefined> {
    return new Promise((resolve: Function, reject: (error: any) => void) => {
      rmdir(`${this._settings.diskPath}${container}`, (error: any) => {
        error && reject(error) || resolve();
      });
    });
  }

  public delAll(): Promise<undefined> {
    return new Promise((resolve: Function, reject: (error: any) => void) => {
      rmdir(this._settings.diskPath, (error: any) => {
        error && reject(error) || resolve();
      });
    });
  }

  private _saveFile(container: string, key: string, data: any): Promise<undefined> {
    return new Promise((resolve: Function, reject: (error: any) => void) => {
      let fileNames: IFolderFile;

      this._generateFilename(container, key)
        .then((fileNames_: IFolderFile) => {
          fileNames = fileNames_;
          return this._createDirectory(fileNames.folder);
        })
        .then(() => {
          this._writeFileOnDisk(fileNames.folder, fileNames.file, data)
            .then(() => resolve())
            .catch(reject);
        })
        .catch(reject);
    });
  }

  private _loadFile(container: string, key: string): Promise<any> {
    return new Promise((resolve: Function, reject: (error: any) => void) => {
      let fileNames: IFolderFile;

      this._generateFilename(container, key)
        .then((fileNames_: IFolderFile) => {
          fileNames = fileNames_;
          this._readFileFromDisk(fileNames.folder, fileNames.file)
            .then((data: any) => resolve(data))
            .catch(reject);
        })
        .catch(reject);
    });
  }

  private _createDirectory(directory: string): Promise<undefined> {
    // todo: make this async
    return new Promise((resolve: Function, reject: Function) => {
      try {
        const sep = '/'; //path.sep;
        const initDir = path.isAbsolute(directory) ? sep : '';
        directory.split(sep).reduce((parentDir, childDir) => {
          const curDir = path.resolve(parentDir, childDir);
          if (!fs.existsSync(curDir)) fs.mkdirSync(curDir);
          return curDir;
        }, initDir);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }

  private _writeFileOnDisk(folder: string, fileName: string, data: any): Promise<undefined> {
    return new Promise((resolve: Function, reject: (error: any) => void) => {
      fs.writeFile(`${folder}/${fileName}`, JSON.stringify(data), (err: any) => {
        if (err)
          reject({errorMessage: `Cannot write file [${folder}/${fileName}]`, error: err});
        else
          resolve();
      });
    });
  }

  private _readFileFromDisk(folder: string, fileName: string): Promise<any> {
    return new Promise((resolve: Function, reject: (error: any) => void) => {
      fs.readFile(`${folder}/${fileName}`, 'utf8', (err: any, data: any) => {
        if (err)
          reject({errorMessage: `Cannot read file [${folder}/${fileName}]`, error: err});
        else
          resolve(JSON.parse(data));
      });
    });
  }

  private _generateFilename(container: string, key: string): Promise<IFolderFile> {
    return new Promise((resolve: (output: IFolderFile) => void, reject: (error: any) => void) => {
      const generatedKey: string = this._splitText(this._getAsciiCodeHash(key), this._settings.fragmentSize, '/');

      const full: string = `${this._settings.diskPath}${escape(container)}/${generatedKey}`;
      const folder: string = full.substr(0, full.lastIndexOf('/'));
      const file: string = full.substr(full.lastIndexOf('/') + 1);

      resolve({full, folder, file});
    });
  }

  private _getAsciiCodeHash(key: string): string {
    return key
      .split('')
      .map((c: string) => c.charCodeAt(0))
      .join('_');
  }

  private _splitText(text: string, step: number, separetor: string): string {
    let output: string = "";
    let se: string[] = text.split('').reverse();
    while (se.length) output += se.splice(0, step).join('') + separetor;
    if (output[output.length - 1] == separetor) output += '_fc';
    return output;
  }


}

