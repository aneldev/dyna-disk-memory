// Export for the types
export {IDynaDiskMemory, IDynaDiskMemoryConfig} from './interfaces';
export * from "./DynaDiskMemoryForNode";

console.error(`
dyna-disk-memory: Import error
    You should import "dyna-disk-memory/dist/commonJs/web" or "dyna-disk-memory/dist/commonJs/node" (with lazy load or not) according the runtime environment.
    There is also am es version instead of commonJs, there imports are "dyna-disk-memory/dist/esNext/web" and "dyna-disk-memory/dist/esNext/node". 
    For typescript, you should import the types from "dyna-disk-memory" but functional code from "web" or "node" versions.
    More for how to import with conditional lazy load: https://github.com/aneldev/dyna-ts-module-boilerplate#how-to-import
`);
