# About

`dyna disk memory` is a simple data holder where uses only the disk. Ideal for node.js applications and services that they don't want to use the expensive memory but their server's disk.

The performance is not the same as the physical memory, as it uses the disk but in now days the ssd disks are much faster and also this library splits the files in small folders so the system uses smaller indices to locate a file. This mechanism is implemented and used first time from this library.

So `dyna disk memory` is intended for large amount of temporary or permanent data with high performance according the disk.

The API is really simple and has nothing to do with files etc, all this _hard job_ is part of this library.

If your project is in Typescript then voila, `dyna disk memory` it is too (you'll become good friends). But anyway can be used from any javascript enviroment.

# Is Universal

Is universal. On browser it uses the `localStorage` so on browser the data limit is the limit browser's `localStorage`.

**But why support browsers?**

Ideal for micro services, web workers that run both in node.js and browsers and want to save permanent data.

# Data structure

We have the `container` where is something like a folder and inside the `container` we drop `keys` with `data`. That's all!

You can delete a `container` or delete all `containers` at once to clean up your disk.  

# Usage

```
// import
import {DynaDiskMemory} from 'dyna-disk-memory'; 

// create a memory
const memory = new DynaDiskMemory({
  diskPath: './debug/diskMemory/',
});

// set a key with an object
memory.set(
    'recipes',                          // container name 
    '84643545',                         // key
    { description: 'Cake with almonds',	// data
      flour: 3.14, sugar: 1.2 }	
)                                       // returns promise
  .then(()=>{
    console.log('data saved');          // that it is saved 
  })
  .catch((error) => {
      console.error('cannot write', error);  // or it failed (only if the disk fails)
  });
  
memory.get(
  'recipes',                    // container name
  '84643545',                   // key
)                               // returns promise
  .then((data)=>{
    console.log('data retreived', data.description); // with our data
  })
  .catch((error) => {
    console.error('cannot read', error);             // or error if key doesn't exist (or disk error)
  });


```

# Methods

## constructor(settings: ISettings)

### diskPath: string (required)

The path where will be created and used to save the data. Can be relative or root based.

### fragmentSize: number (optional)

This is optional, the default value is 13. Is the size of the fragments to break the folder names. No need to touch it.

## set(container: string, key: string, data: any): Promise<undefined>

Writes or overwrites the `data` into a `container` for this `key`.

Returns a Promise, `resolve: Function` and `reject: (error:any) => void`.

The only error can be occured can be from disk.

## get(container: string, key: string): Promise<any>

Returns the`data` from this `container` for this `key`.

Returns a Promise, `resolve: (data: any) => void` with the saved data.

If `key` not found the `resolve` will returned with `data: undefined`;

## del(container: string, key: string): Promise<any>

Deletes a `key` from this container.

Returns a Promise, `resolve: Function` on completion of delete and `reject: (error:any) => void` on disk error.

## delContainer(container: string): Promise<undefined>

Deletes a `container`, that means all the `keys` and `data` will be gone permantelly.

Returns a Promise, `resolve: Function` when the deletion completed and `reject: (error:any) => void` on disk error.

## delAll(): Promise<undefined>

Deletes everything, delete the `diskPath` defined on constructor.

Returns a Promise, `resolve: Function` when the deletion completed and `reject: (error:any) => void` on disk error.

# FAQ

## When can we get a disk error

Only when something is wrong with your disk! Is not a case to get an error because of a folders trouble or something like this! Under the hood, the folders and the files have small names that consistent only from numbers. So it is impossible to have system problem with folders.

The only error you can expect is on `get()` if the key doesn't exist.

# For geeks

The code is very simple! If you dive into you will see that whole code is only 160 lines! 

**No dependencies!**

# The future

There is no thoughts to extend this library. It is doing something very specific and it is doing this well. Other amazing libraries can be built using this, like: queue handlers, network buffers that they don't want to loose their data if they crashed. 

# Debug, Form, Liberté!

This project made with [dyna-ts-module-boilerplate](https://github.com/aneldev/dyna-ts-module-boilerplate), help of it is [here in readme.boilerplate](./readme.boilerplate.md).