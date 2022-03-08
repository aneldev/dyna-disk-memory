import { IDynaDiskMemoryConfig, IDynaDiskMemory } from '../interfaces';
export declare class DynaDiskMemory implements IDynaDiskMemory {
    private readonly _settings;
    constructor(_settings: IDynaDiskMemoryConfig);
    private _jogQueue;
    _test_performDiskDelay: number;
    set<TData>(container: string, key: string, data: TData): Promise<void>;
    get<TData>(container: string, key: string): Promise<TData>;
    del(container: string, key: string): Promise<void>;
    private _deleteEmptyFolderPath;
    private _deleteEmptyFolder;
    delContainer(container: string): Promise<void>;
    delAll(): Promise<void>;
    private _saveFile;
    private _loadFile;
    private _createDirectory;
    private _writeFileOnDisk;
    private _readFileFromDisk;
    private _generateFilename;
    private _getAsciiCodeHash;
    private _splitText;
}
