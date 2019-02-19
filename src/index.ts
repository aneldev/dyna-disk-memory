// Export for the types
export {IDynaDiskMemory, IDynaDiskMemoryConfig} from './interfaces';
export * from "./DynaDiskMemoryForNode";

// ... but console error since this export is only for types
console.error('dyna-disk-memory: you should import from "dyna-disk-memory/web" or "dyna-disk-memory/node"');
