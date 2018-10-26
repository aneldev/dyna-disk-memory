import { IDynaDiskMemory, ISettings } from './interfaces';
export declare class DynaDiskMemoryForBrowser implements IDynaDiskMemory {
    constructor(settings: ISettings);
    private _settings;
    _test_performDiskDelay: number;
    set<TData>(container: string, key: string, data: TData): Promise<void>;
    get<TData>(container: string, key: string): Promise<TData>;
    del(container: string, key: string): Promise<void>;
    delContainer(container: string): Promise<void>;
    delAll(): Promise<void>;
    private _generateFilename;
}
