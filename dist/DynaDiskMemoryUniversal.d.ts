import { ISettings } from './interfaces';
export declare class DynaDiskMemoryUniversal {
    constructor(settings: ISettings);
    _test_performDiskDelay: number;
    private _settings;
    private _memory;
    set<TData>(container: string, key: string, data: TData): Promise<void>;
    get<TData>(container: string, key: string): Promise<TData>;
    del(container: string, key: string): Promise<any>;
    delContainer(container: string): Promise<void>;
    delAll(): Promise<void>;
}
