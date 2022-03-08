export interface IDynaDiskMemoryConfig {
  fragmentSize?: number;
  diskPath: string;
  _test_workForBrowser?: boolean;   // Force it to work as in browser (for tests under nodejs)
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
