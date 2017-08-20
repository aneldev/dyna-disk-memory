import {DynaDiskMemoryForNode} from './DynaDiskMemoryForNode';
import {DynaDiskMemoryForBrowser} from './DynaDiskMemoryForBrowser';

import {IDynaDiskMemory, ISettings} from './interfaces';

export class DynaDiskMemoryUniversal {
  constructor(settings: ISettings) {
    this._settings = {
      fragmentSize: 13,
      ...settings
    };
    if (settings.diskPath[settings.diskPath.length - 1] !== '/') this._settings.diskPath += '/'

    if (this._isNode(!!this._settings._test_workForBrowser))
      this._memory = new DynaDiskMemoryForNode(this._settings);
    else
      this._memory = new DynaDiskMemoryForBrowser(this._settings);
    this._memory._test_performDiskDelay = this._test_performDiskDelay;
  }

  public _test_performDiskDelay: number = 0;
  private _settings: ISettings;
  private _memory: IDynaDiskMemory;

  public set(container: string, key: string, data: any): Promise<undefined> {
    return this._memory.set(container, key, data);
  }

  public get(container: string, key: string): Promise<any> {
    return this._memory.get(container, key);
  }

  public del(container: string, key: string): Promise<any> {
    return this._memory.del(container, key);
  }

  public delContainer(container: string): Promise<undefined> {
    return this._memory.delContainer(container);
  }

  public delAll(): Promise<undefined> {
    return this._memory.delAll();
  }

  private _isNode(_test_workForBrowser: boolean): boolean {
    if (_test_workForBrowser) return false;
    return typeof process === 'object' && typeof process.versions === 'object';
  }

}

