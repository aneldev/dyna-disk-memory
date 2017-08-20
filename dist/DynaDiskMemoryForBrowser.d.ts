import { IDynaDiskMemory, ISettings } from './interfaces';
export declare class DynaDiskMemoryForBrowser implements IDynaDiskMemory {
    constructor(settings: ISettings);
    private _settings;
    _test_performDiskDelay: number;
    set(container: string, key: string, data: any): Promise<void>;
    get(container: string, key: string): Promise<any>;
    del(container: string, key: string): Promise<void>;
    delContainer(container: string): Promise<void>;
    delAll(): Promise<void>;
    private _generateFilename(container?, key?);
}
