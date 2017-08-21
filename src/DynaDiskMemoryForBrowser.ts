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

  public set(container: string, key: string, data: any): Promise<void> {
    return new Promise((resolve: Function, reject: (error: any) => void) => {
      try {
        const names: IFolderFile = this._generateFilename(container, key);
        localStorage.setItem(names.full, JSON.stringify(data));
        setTimeout(resolve, this._test_performDiskDelay);
      } catch (err) {
        setTimeout(reject, this._test_performDiskDelay, err);
      }
    });
  }

  public get(container: string, key: string): Promise<any> {
    return new Promise((resolve: Function, reject: (error: any) => void) => {
      try {
        const names: IFolderFile = this._generateFilename(container, key);
        const rawData: any = localStorage.getItem(names.full);
        let data: any = undefined;
        if (typeof rawData == 'string') data = JSON.parse(rawData);
        setTimeout(resolve, this._test_performDiskDelay, data);
      } catch (err) {
        setTimeout(reject, this._test_performDiskDelay, err);
      }
    });
  }

  public del(container: string, key: string): Promise<void> {
    return new Promise((resolve: Function, reject: (error: any) => void) => {
      const names: IFolderFile = this._generateFilename(container, key);
      localStorage.removeItem(names.full);
      setTimeout(resolve, this._test_performDiskDelay);
    });
  }

  public delContainer(container: string): Promise<void> {
    return new Promise((resolve: Function, reject: (error: any) => void) => {
      const names: IFolderFile = this._generateFilename(container);
      Object.keys(localStorage)
        .filter((key: string) => key.startsWith(names.folder + '/'))
        .forEach((key: string) => localStorage.removeItem(key));
      setTimeout(resolve, this._test_performDiskDelay);
    });
  }

  public delAll(): Promise<void> {
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

