import { IDynaDiskMemory, ISettings } from './interfaces';
export declare class DynaDiskMemoryForBrowser implements IDynaDiskMemory {
    constructor(settings: ISettings);
    private _settings;
    _test_performDiskDelay: number;
    set(container: string, key: string, data: any): Promise<undefined>;
    get(container: string, key: string): Promise<any>;
    del(container: string, key: string): Promise<undefined>;
    delContainer(container: string): Promise<undefined>;
    delAll(): Promise<undefined>;
    private _generateFilename(container?, key?);
    private _isNode();
}
