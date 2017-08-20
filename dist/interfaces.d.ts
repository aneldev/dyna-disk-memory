export interface ISettings {
    fragmentSize?: number;
    diskPath: string;
    _test_workForBrowser?: boolean;
    _test_performDiskDelay?: number;
}
export interface IDynaDiskMemory {
    _test_performDiskDelay: number;
    set(container: string, key: string, data: any): Promise<void>;
    get(container: string, key: string): Promise<any>;
    del(container: string, key: string): Promise<void>;
    delContainer(container: string): Promise<void>;
    delAll(): Promise<void>;
}
