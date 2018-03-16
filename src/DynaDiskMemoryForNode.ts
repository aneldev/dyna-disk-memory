import {emptyDir, remove} from "fs-extra";

const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;

import {DynaJobQueue} from "dyna-job-queue";
import {ISettings, IDynaDiskMemory} from './interfaces';
import {isFolderEmpty} from "dyna-node-fs";

interface IFolderFile {
  full: string;
  folder: string;
  file: string;
  containerBase: string;
}

export class DynaDiskMemoryForNode implements IDynaDiskMemory {
  constructor(settings: ISettings) {
    this._settings = {
      fragmentSize: 13,
      ...settings
    };

    if (settings.diskPath[settings.diskPath.length - 1] !== '/') this._settings.diskPath += '/'
    if (this._test_performDiskDelay) console.warn('DynaDiskMemory is working with _test_performDiskDelay not zero, this means will perform intentional delays, this should be not set like this on production');
  }

  private _settings: ISettings;
  private _jogQueue = new DynaJobQueue();
  public _test_performDiskDelay: number = 0;

  public set<TData>(container: string, key: string, data: TData): Promise<void> {
    return this._jogQueue.addJobPromise((resolve: Function, reject: (error: any) => void) => {
      this._saveFile(container, key, data)
        .then(() => resolve())
        .catch(reject);
    });
  }

  public get<TData>(container: string, key: string): Promise<TData> {
    return this._jogQueue.addJobPromise((resolve: (data:TData)=>void, reject: (error: any) => void) => {
      this._loadFile(container, key)
        .then(resolve)
        .catch(reject);
    });
  }

  public del(container: string, key: string): Promise<void> {
    return this._jogQueue.addJobPromise((resolve: Function, reject: (error: any) => void) => {
      const fileInfo: IFolderFile = this._generateFilename(container, key);

      remove(fileInfo.full, (err: any) => {
        if (err) {
          reject(err);
        } else {
          this._deleteEmptyFolderPath(fileInfo)
            .then(() => resolve())
            .catch(reject);
        }
      });
    });
  }

  private _deleteEmptyFolderPath(fileInfo: IFolderFile): Promise<void> {
    return new Promise<void>((resolve: Function, reject: (error: any) => void) => {
      let foldersToDel: string[] = [];
      let folder: string = fileInfo.folder;

      while (folder.length && folder !== this._settings.diskPath.slice(0, -1)) {
        foldersToDel.push(folder);
        folder = folder.substr(0, folder.lastIndexOf('/'));
      }

      let folderToDel: string = foldersToDel.shift();
      const run = () => {
        if (folderToDel) {
          this._deleteEmptyFolder(folderToDel)
            .then(() => {
              folderToDel = foldersToDel.shift();
              if (folderToDel) run(); else resolve();
            })
            .catch(reject);
        }
        else{
          resolve(); // no folder
        }
      };

      run(); // start
    });
  }

  private _deleteEmptyFolder(folder: string): Promise<void> {
    return isFolderEmpty(folder)
      .then((isEmpty: boolean) => {
        if (!isEmpty) return;

        return new Promise<void>((resolve: () => void, reject: (error: any) => void) => {
          remove(folder, (err: any) => {
            if (err) reject(err); else resolve();
          })
        })
      });
  }

  public delContainer(container: string): Promise<void> {
    const folder = this._generateFilename(container).folder;
    return this._jogQueue.addJobPromise((resolve: Function, reject: (error: any) => void) => {
      remove(folder, (err) => {
        if (err) reject(err); else resolve();
      });
    });
  }

  public delAll(): Promise<void> {
    return this._jogQueue.addJobPromise((resolve: Function, reject: (error: any) => void) => {
      remove(this._settings.diskPath, (error: any) => {
        error && reject(error) || resolve();
      });
    });
  }

  private _saveFile(container: string, key: string, data: any): Promise<void> {
    return new Promise((resolve: Function, reject: (error: any) => void) => {
      let fileNames: IFolderFile = this._generateFilename(container, key);

      this._createDirectory(fileNames.folder)
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
      let fileNames: IFolderFile = this._generateFilename(container, key);

      this._readFileFromDisk(fileNames.folder, fileNames.file)
        .then((data: any) => resolve(data))
        .catch((error: any) => resolve(undefined));
    });
  }

  private _createDirectory(directory: string): Promise<void> {
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

  private _writeFileOnDisk(folder: string, fileName: string, data: any): Promise<void> {
    return new Promise((resolve: Function, reject: (error: any) => void) => {
      const fullPath: string = `${folder}/${fileName}`;
      setTimeout(() => {
        fs.exists(fullPath, (exists: boolean) => {
          if (exists) fs.unlinkSync(fullPath);
          fs.writeFile(`${fullPath}`, JSON.stringify(data), (err: any) => {
            if (err)
              reject({errorMessage: `Cannot write file [${fullPath}]`, error: err});
            else
              resolve();
          });
        });
      }, this._test_performDiskDelay);
    });
  }

  private _readFileFromDisk(folder: string, fileName: string): Promise<any> {
    return new Promise((resolve: Function, reject: (error: any) => void) => {
      setTimeout(() => {
        const fullFileName: string = `${folder}/${fileName}`;
        fs.exists(fullFileName, function (exists: boolean) {
          if (exists) {
            fs.readFile(fullFileName, 'utf8', (err: any, data: any) => {
              if (err)
                reject({code: 1802241812, errorMessage: `Cannot read file [${fullFileName}]`, error: err});
              else
                try {
                  resolve(JSON.parse(data));
                } catch (error) {
                  reject({code: 1802241811, errorMessage: `Cannot parse file [${fullFileName}]`, error: err});
                }
            });
          }
          else {
            reject({code: 1802241813, errorMessage: `DynaDiskMemory: _readFileFromDisk: cannot find to read file for folder [${folder}] and fileName [${fileName}]`, fullFileName});
          }
        });
      }, this._test_performDiskDelay);
    });
  }

  private _generateFilename(container: string, key: string = ''): IFolderFile {
    const generatedContainer: string = this._getAsciiCodeHash(container);
    const generatedKey: string = this._splitText(this._getAsciiCodeHash(key), this._settings.fragmentSize, '/');

    const full: string = `${this._settings.diskPath}${generatedContainer}/${generatedKey}`;
    const folder: string = full.substr(0, full.lastIndexOf('/'));
    const file: string = full.substr(full.lastIndexOf('/') + 1);
    let containerBase: string = `${generatedContainer}/${generatedKey}`;
    containerBase = containerBase.substr(0, containerBase.lastIndexOf('/'));

    return {full, folder, file, containerBase};
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

  private _rmdir(file, cb: (error: any) => void): void {
    exec('rm -rf ' + file, function (err: any, stdout: any, stderr: any) {
      cb(err);
    });
  }
}

