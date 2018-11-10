# About

`dyna disk memory` is a simple data holder where it uses only the disk. Ideal for node.js applications and services that they don't want to use the expensive memory but their server's disk.

The performance is not the same as the physical memory, as it uses the disk but in nowadays the ssd disks are much faster and also this library splits the files in small folders so the system uses smaller indices to locate a file. This mechanism is implemented and used for the first time by this library.

So `dyna disk memory` is intended for a large amount of temporary or permanent data with a high performance according the disk.

The API is really simple and has nothing to do with files etc, all this _hard job_ is part of this library.

If your project is in Typescript then voila, `dyna disk memory`  is too (you'll become good friends). But anyway it can be used by any javascript environment.

# Is Universal

Is universal. On the browser it uses the `localStorage` so on the browser the data limit is the limit browser's `localStorage`.

**But why universal support?**

Ideal for libraries that work in micro services (node.js) or web workers (browsers) that want to save a permanent data.

# Data structure

We have the `container` which is something like a folder and  we drop `keys` with `data` ‘inside the container’. That's all!

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
    { description: 'Cake with almonds',    // data
      flour: 3.14, sugar: 1.2 }    
)                                       // returns promise
  .then(()=>{
    console.log('data saved');          // that it is saved
  })
  .catch((error) => {
      console.error('cannot write', error);
  });
 
memory.get(
  'recipes',                    // container name
  '84643545',                   // key
)                               // returns promise
  .then((data)=>{
    console.log('data retrieved', data.description); // with our data
  })
  .catch((error) => {
    console.error('cannot read', error);             // or error if key doesn't exist
  });


```

# Methods

## constructor(settings: ISettings)

### diskPath: string (required)

The path which will be created and used to save the data. Can be relative or root based.

### fragmentSize: number (optional)

This is optional, the default value is 13. It Is the size of the fragments to break the folder names. No need to touch it.

## set(container: string, key: string, data: any): Promise<undefined>

Writes or overwrites the `data` into a `container` for this `key`.

Returns a Promise, `resolve: Function` and `reject: (error:any) => void`.

You might get only these errors:
- the data cannot be stringified
- on node.js, there is a disk error
- on browser, there is no free space in localStorage

## get(container: string, key: string): Promise<any>

It returns the`data` from this `container` for this `key`.

It returns a Promise, `resolve: (data: any) => void` with the saved data.

If `key`is not found the `resolve` will be returned with `data: undefined`;

## del(container: string, key: string): Promise<any>

It deletes a `key` from this container.

It returns a Promise, `resolve: Function` on completion of delete and `reject: (error:any) => void` on disk error.

## delContainer(container: string): Promise<undefined>

It deletes a `container`, that means all the `keys` and `data` will be gone permanently.

It returns a Promise, `resolve: Function` when the deletion is completed and `reject: (error:any) => void` on disk error.

## delAll(): Promise<undefined>

It deletes everything, deletes the `diskPath` which is defined in the settings.

It returns a Promise, `resolve: Function` when the deletion is completed and `reject: (error:any) => void` on disk error.

# FAQ

## When can we get a disk error

> Note that errors are raised only as rejected Promises.

### In node.js

- When something is wrong with your disk.
- When someone blocks instantly your files (like a test-watch)

## In browser

- On `set()` if there is not enough space in localStorage.

Every browser has different limit, you have to catch and handle the rejected Promise. 

While each browser has a different limit it doesn’t worth to count the data you stored.

A roughly check of the used localStore size can be done with this script:

```
Object.keys(localStorage).reduce((total, key)=>{
  let data = localStorage[key];
  if (typeof data == 'string') total += data.length;
  return total;
}, 0);
```

## Where is the `test-watch`?

It doesn’t exist in purpose! The demon is watching the files under the `temp/` and it instantly blocks the state of them and tests are failing.

# The future

There is no thoughts to extend this library. It is doing something very specific and it is doing this well. Other amazing libraries can be built using this, like: queue handlers, network buffers that they don't want to lose their data if they crashed.

# Troubleshooting

## Webpack cannot resolve `child_process`

Webpack builder for web environments might complain for missing `child_process`.

In this case add this to your Webpack config:

```
	node: {
		child_process: "empty",
	},

```

# Debug, Fork, Dist, Liberté!

This project made with [dyna-ts-module-boilerplate](https://github.com/aneldev/dyna-ts-module-boilerplate), help of it is [here in readme.boilerplate](./readme.boilerplate.md).
