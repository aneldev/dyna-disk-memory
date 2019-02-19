import { IDynaDiskMemory, IDynaDiskMemoryConfig } from './interfaces';
export declare class DynaDiskMemory implements IDynaDiskMemory {
    constructor(settings: IDynaDiskMemoryConfig);
    private _jogQueue;
    private _settings;
    _test_performDiskDelay: number;
    set<TData>(container: string, key: string, data: TData): Promise<void>;
    get<TData>(container: string, key: string): Promise<TData>;
    del(container: string, key: string): Promise<void>;
    delContainer(container: string): Promise<void>;
    delAll(): Promise<void>;
    private _generateFilename;
}
