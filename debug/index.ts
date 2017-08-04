declare let window: any;
declare let global: any, describe: any, clearTest: any, it: any, expect: any;
import "./mock-jest";

import {ISettings, DynaDiskMemory} from '../src'

//import '../tests/main.test'; // debug any test (experimental)


const memory:DynaDiskMemory = new DynaDiskMemory({
  diskPath: './debug/diskMemory/',
});

/*
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
  });*/

debugger;
memory.get(
  'recipes',                    // container name
  '84643545',                       // key
)                                        // returns promise
  .then((data)=>{
    console.log('data retreived', data.description);          // that it is saved
  })
  .catch((error) => {
    console.error('cannot read', error);  // or error if key doesn't exist or disk error
  });



/*
memory.set('recipes', 'cake with almonds', {flour: 3.14, name: 'ελληνικο'})
  .then(()=>{
    console.log('data saved');
    debugger;
    memory.get('recipes', 'cake with almonds')
      .then((data: any) => {
        console.log('data retreived', data);

        // memory.delContainer('recipes')
        //   .then(() => console.log('success container delete'))
        //   .catch((error: any) => console.error('error, cannot delete the container'))

        // memory.del('recipes', 'cake with almonds')
        //   .then(()=>console.log('success delete'))
        //   .catch((err:any)=>console.log('delete failed',err));

        // memory.delAll()
        //   .then(()=>console.log('success delete all'))
        //   .catch((err:any)=>console.log('delete all failed',err));
      })
      .catch((error:any)=>console.error('cannot read', error));
  })
  .catch((error:any)=>console.error('cannot write', error));


*/
