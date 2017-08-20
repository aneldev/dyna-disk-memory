import {IDynaDiskMemory, ISettings} from './interfaces';

interface IFolderFile {
  full: string;
  base: string;
  folder: string;
  file: string;
}

export class DynaDiskMemoryForBrowser implements IDynaDiskMemory {
  constructor(settings: ISettings) {
    this._settings = {
      fragmentSize: 13,
      ...settings
    };

    if (settings.diskPath[settings.diskPath.length - 1] !== '/') this._settings.diskPath += '/'
  }

  private _settings: ISettings;
  public _test_performDiskDelay: number = 0;

  public set(container: string, key: string, data: any): Promise<undefined> {
    return new Promise((resolve: Function, reject: (error: any) => void) => {
      const names: IFolderFile = this._generateFilename(container, key);
      localStorage.setItem(names.full, JSON.stringify(data));
      setTimeout(resolve, this._test_performDiskDelay);
    });
  }

  public get(container: string, key: string): Promise<any> {
    return new Promise((resolve: Function, reject: (error: any) => void) => {
      const names: IFolderFile = this._generateFilename(container, key);
      const data: any = JSON.parse(localStorage.getItem(names.full));
      setTimeout(resolve, this._test_performDiskDelay, data);
    });
  }

  public del(container: string, key: string): Promise<undefined> {
    return new Promise((resolve: Function, reject: (error: any) => void) => {
      const names: IFolderFile = this._generateFilename(container, key);
      localStorage.removeItem(names.full);
      setTimeout(resolve, this._test_performDiskDelay);
    });
  }

  public delContainer(container: string): Promise<undefined> {
    return new Promise((resolve: Function, reject: (error: any) => void) => {
      const names: IFolderFile = this._generateFilename(container);
      const keysToDel: string [] = Object.keys(localStorage)
        .filter((key: string) => key.startsWith(names.folder + '/'));
      keysToDel.forEach((key: string) => localStorage.removeItem(key));
      setTimeout(() => {
        if (keysToDel.length) resolve(); else reject({errorMessage: 'Nothing to del'});
      }, this._test_performDiskDelay);
    });
  }

  public delAll(): Promise<undefined> {
    return new Promise((resolve: Function, reject: (error: any) => void) => {
      const names: IFolderFile = this._generateFilename();
      Object.keys(localStorage)
        .filter((key: string) => key.startsWith(names.base + '/'))
        .forEach((key: string) => localStorage.removeItem(key));
      setTimeout(resolve, this._test_performDiskDelay);
    });
  }

  private _generateFilename(container: string = '---', key: string = '---'): IFolderFile {
    const full: string = `dyna-disk-memory/${this._settings.diskPath}${container}/${key}`;
    const base: string = full.substr(0, full.indexOf('/'));
    const folder: string = full.substr(0, full.lastIndexOf('/'));
    const file: string = full.substr(full.lastIndexOf('/') + 1);

    return {full, base, folder, file};
  }
}

