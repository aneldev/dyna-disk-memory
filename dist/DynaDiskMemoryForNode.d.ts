import { ISettings, IDynaDiskMemory } from './interfaces';
export declare class DynaDiskMemoryForNode implements IDynaDiskMemory {
    constructor(settings: ISettings);
    private _settings;
    _test_performDiskDelay: number;
    set(container: string, key: string, data: any): Promise<undefined>;
    get(container: string, key: string): Promise<any>;
    del(container: string, key: string): Promise<undefined>;
    delContainer(container: string): Promise<undefined>;
    delAll(): Promise<undefined>;
    private _saveFile(container, key, data);
    private _loadFile(container, key);
    private _createDirectory(directory);
    private _writeFileOnDisk(folder, fileName, data);
    private _readFileFromDisk(folder, fileName);
    private _generateFilename(container, key);
    private _getAsciiCodeHash(key);
    private _splitText(text, step, separetor);
    private _rmdir(file, cb);
}