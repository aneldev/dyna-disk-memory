/// <reference path="../node_modules/@types/node/index.d.ts" />
export interface ISettings {
    fragmentSize?: number;
    diskPath: string;
}
export declare class DynaDiskMemory {
    constructor(settings: ISettings);
    private settings;
    set(container: string, key: string, data: any): Promise<undefined>;
    get(container: string, key: string): Promise<any>;
    del(container: string, key: string): Promise<any>;
    delContainer(container: string): Promise<undefined>;
    delAll(): Promise<undefined>;
    private saveFile(container, key, data);
    private loadFile(container, key);
    private createDirectory(directory);
    private writeFileOnDisk(folder, fileName, data);
    private readFileFromDisk(folder, fileName);
    private generateFilename(container, key);
    private getAsciiCodeHash(key);
    private splitText(text, step, separetor);
}
