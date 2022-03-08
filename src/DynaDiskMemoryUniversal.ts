// Dev node: This is not used at the moment, will be used once the Webpack supports target: "universal"

import {isNode}                                 from 'dyna-universal';
import {
  IDynaDiskMemory, IDynaDiskMemoryConfig,
} from './interfaces';

import {DynaDiskMemory as DynaDiskMemoryForBrowser} from './DynaDiskMemoryForBrowser';
import {DynaDiskMemory as DynaDiskMemoryForNode} from './DynaDiskMemoryForNode';

export class DynaDiskMemoryUniversal {
  constructor(settings: IDynaDiskMemoryConfig) {
    this._settings = {
      fragmentSize: 13,
      _test_workForBrowser: false,
      _test_performDiskDelay: 0,
      ...settings,
    };
    if (settings.diskPath[settings.diskPath.length - 1] !== '/') this._settings.diskPath += '/';

    if (this._settings._test_workForBrowser) {
      this._memory = new DynaDiskMemoryForBrowser(this._settings);
    }
    else if (isNode) {
      this._memory = new DynaDiskMemoryForNode(this._settings);
    }
    else {
      this._memory = new DynaDiskMemoryForBrowser(this._settings);
    }

    this._memory._test_performDiskDelay = this._test_performDiskDelay;
  }

  public _test_performDiskDelay: number = 0;
  private _settings: IDynaDiskMemoryConfig;
  private _memory: IDynaDiskMemory;

  public set<TData>(container: string, key: string, data: TData): Promise<void> {
    return this._memory.set<TData>(container, key, data);
  }

  public get<TData>(container: string, key: string): Promise<TData> {
    return this._memory.get<TData>(container, key);
  }

  public del(container: string, key: string): Promise<any> {
    return this._memory.del(container, key);
  }

  public delContainer(container: string): Promise<void> {
    return this._memory.delContainer(container);
  }

  public delAll(): Promise<void> {
    return this._memory.delAll();
  }
}

