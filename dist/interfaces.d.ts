export interface ISettings {
    fragmentSize?: number;
    diskPath: string;
    _test_workForBrowser?: boolean;
    _test_performDiskDelay?: number;
}
export interface IDynaDiskMemory {
    _test_performDiskDelay: number;
    set(container: string, key: string, data: any): Promise<undefined>;
    get(container: string, key: string): Promise<any>;
    del(container: string, key: string): Promise<undefined>;
    delContainer(container: string): Promise<undefined>;
    delAll(): Promise<undefined>;
}
