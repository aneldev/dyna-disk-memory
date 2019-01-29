export interface IDynaDiskMemoryConfig {
    fragmentSize?: number;
    diskPath: string;
    _test_workForBrowser?: boolean;
    _test_performDiskDelay?: number;
}
export interface IDynaDiskMemory {
    _test_performDiskDelay: number;
    set<TData>(container: string, key: string, data: TData): Promise<void>;
    get<TData>(container: string, key: string): Promise<TData>;
    del(container: string, key: string): Promise<void>;
    delContainer(container: string): Promise<void>;
    delAll(): Promise<void>;
}
