export interface ISettings {
    fragmentSize?: number;
    diskPath: string;
    _test_workForBrowser?: boolean;
    _test_performDiskDelay?: number;
}
export interface IDynaDiskMemory {
    _test_performDiskDelay: number;
    set<T>(container: string, key: string, data: T): Promise<void>;
    get<T>(container: string, key: string): Promise<T>;
    del(container: string, key: string): Promise<void>;
    delContainer(container: string): Promise<void>;
    delAll(): Promise<void>;
}
