import { ISettings, IDynaDiskMemory } from './interfaces';
export declare class DynaDiskMemoryForNode implements IDynaDiskMemory {
    constructor(settings: ISettings);
    private _settings;
    private _jogQueue;
    _test_performDiskDelay: number;
    set<TData>(container: string, key: string, data: TData): Promise<void>;
    get<TData>(container: string, key: string): Promise<TData>;
    del(container: string, key: string): Promise<void>;
    private _deleteEmptyFolderPath(fileInfo);
    private _deleteEmptyFolder(folder);
    delContainer(container: string): Promise<void>;
    delAll(): Promise<void>;
    private _saveFile(container, key, data);
    private _loadFile(container, key);
    private _createDirectory(directory);
    private _writeFileOnDisk(folder, fileName, data);
    private _readFileFromDisk(folder, fileName);
    private _generateFilename(container, key?);
    private _getAsciiCodeHash(key);
    private _splitText(text, step, separetor);
    private _rmdir(file, cb);
}
