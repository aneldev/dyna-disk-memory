import { ISettings } from './interfaces';
export declare class DynaDiskMemoryUniversal {
    constructor(settings: ISettings);
    _test_performDiskDelay: number;
    private _settings;
    private _memory;
    set(container: string, key: string, data: any): Promise<undefined>;
    get(container: string, key: string): Promise<any>;
    del(container: string, key: string): Promise<any>;
    delContainer(container: string): Promise<undefined>;
    delAll(): Promise<undefined>;
    private _isNode(_test_workForBrowser);
}
