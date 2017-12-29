import { ISettings } from './interfaces';
export declare class DynaDiskMemoryUniversal {
    constructor(settings: ISettings);
    _test_performDiskDelay: number;
    private _settings;
    private _memory;
    set<T>(container: string, key: string, data: T): Promise<void>;
    get<T>(container: string, key: string): Promise<T>;
    del(container: string, key: string): Promise<any>;
    delContainer(container: string): Promise<void>;
    delAll(): Promise<void>;
}
