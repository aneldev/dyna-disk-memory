// help: https://facebook.github.io/jest/docs/expect.html
declare let global: any, jasmine: any, describe: any, expect: any, it: any;
if (typeof jasmine !== 'undefined') jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;

import {DynaDiskMemory} from './../src';
import {forTimes} from 'dyna-loops'
import {randomText} from './utils/randomText';

// localStorage polyfill
if (typeof global.LocalStorage === "undefined" || global.LocalStorage === null) {
  const LocalStorage = require('node-localstorage').LocalStorage;
  global.localStorage = new LocalStorage('./temp/localStoragePolyfill', 1000000); // 10mb
}

let ddm: DynaDiskMemory = new DynaDiskMemory({
  diskPath: './temp/dynaDiskMemoryTest',
  _test_workForBrowser:true,
});
ddm._test_performDiskDelay = 100;

const chinese: string = '把百度设为主页关于百度';
const TEST_ITEMS_AMOUNT: number = 100; // dev note: decrease this for debugging

describe('My Module Person tests', () => {

  // write / read one key

  it('should set a key', (done: Function) => {
    ddm.set(
      'books', '#39922323',
      {title: 'Gone with the wind', pages: 2000, price: 23.23, isbn: '02760245N4353'}
    )
      .then(() => {
        expect(true).toBe(true);
        done();
      })
      .catch((error: any) => {
        expect(error).toBe(null);
        done();
      });
  });

  it('should get this key', (done: Function) => {
    debugger;
    ddm.get('books', '#39922323')
      .then((data: any) => {
        expect(data.title).toBe('Gone with the wind');
        expect(data.pages).toBe(2000);
        expect(data.price).toBe(23.23);
        expect(data.isbn).toBe('02760245N4353');
        done();
      })
      .catch((error: any) => {
        expect(error).toBe(null);
        done();
      });
  });

  // write / read 100 keys delete in the mean time

  it(`should set a ${TEST_ITEMS_AMOUNT} keys with large data`, (done: Function) => {
    let success: number = 0;
    forTimes(TEST_ITEMS_AMOUNT, (i: number) => {
      ddm.set(
        'books', `${i}-superdooperkey`,
        {title: `Test book with key ${i}`, pages: i * 23, price: i * 0.87, isbn: `02760245N4353-${i}`}
      )
        .then(() => {
          expect(true).toBe(true);
          success++;
          if (success === TEST_ITEMS_AMOUNT) done();
        })
        .catch((error: any) => {
          expect(error).toBe(null);
        });
    });
  });

  it(`should get the ${TEST_ITEMS_AMOUNT} keys with large data`, (done: Function) => {
    let success: number = 0;
    forTimes(TEST_ITEMS_AMOUNT, (i: number) => {
      ddm.get('books', `${i}-superdooperkey`)
        .then((data) => {
          expect(data.title).toBe(`Test book with key ${i}`);
          expect(data.pages).toBe(i * 23);
          expect(data.price).toBe(i * 0.87);
          expect(data.isbn).toBe(`02760245N4353-${i}`);
          success++;
          if (success === TEST_ITEMS_AMOUNT) done();
        })
        .catch((error: any) => {
          expect(error).toBe(null);
        });
    });
  });

  it('should delete a key', (done: Function) => {
    ddm.del('books', '#39922323')
      .then(() => {
        expect(true).toBe(true);
        done();
      })
      .catch((error: any) => {
        expect(error).toBe(null);
        done();
      })
  });

  it('should not get the deleted key', (done: Function) => {
    ddm.get('books', '#39922323')
      .then((data) => {
        expect(data).toBe(null);
        done();
      })
      .catch((error: any) => {
        expect(error).not.toBe(null);
        done();
      })
  });

  it(`should get again the ${TEST_ITEMS_AMOUNT} keys with large data`, (done: Function) => {
    let success: number = 0;
    forTimes(TEST_ITEMS_AMOUNT, (i: number) => {
      ddm.get('books', `${i}-superdooperkey`)
        .then((data) => {
          expect(data.title).toBe(`Test book with key ${i}`);
          expect(data.pages).toBe(i * 23);
          expect(data.price).toBe(i * 0.87);
          expect(data.isbn).toBe(`02760245N4353-${i}`);
          success++;
          if (success === TEST_ITEMS_AMOUNT) done();
        })
        .catch((error: any) => {
          expect(error).toBe(null);
        });
    });
  });


  // test small to large keys

  it(`should set a keys from small to big key length (max ${TEST_ITEMS_AMOUNT})`, (done: Function) => {
    let success: number = 0;
    forTimes(TEST_ITEMS_AMOUNT, (i: number) => {
      let key: string = '';
      forTimes(i + 1, () => key += '.');
      ddm.set(
        'magazines', key,
        {title: `Magazine of ${i}${i * 13}`, price: i * 0.87, barcode: `9981155481${i}`}
      )
        .then(() => {
          expect(true).toBe(true);
          success++;
          if (success === TEST_ITEMS_AMOUNT) done();
        })
        .catch((error: any) => {
          expect(error).toBe(null);
        });
    });
  });

  it(`should get a keys from small to big key length (max ${TEST_ITEMS_AMOUNT})`, (done: Function) => {
    let success: number = 0;
    forTimes(TEST_ITEMS_AMOUNT, (i: number) => {
      let key: string = '';
      forTimes(i + 1, () => key += '.');
      ddm.get('magazines', key)
        .then((data) => {
          expect(data.title).toBe(`Magazine of ${i}${i * 13}`);
          expect(data.price).toBe(i * 0.87);
          expect(data.barcode).toBe(`9981155481${i}`);
          success++;
          if (success === TEST_ITEMS_AMOUNT) done();
        })
        .catch((error: any) => {
          expect(error).toBe(null);
        });
    });
  });

  // test with random text

  it(`should set a keys from random text db (items: ${randomText.length})`, (done: Function) => {
    let success: number = 0;
    randomText.forEach((text: string, i: number) => {
      const key: string = text;
      ddm.set(
        'novels', key,
        {title: `Novel; ${key}`, price: i * 3.87, isbn: `XXX9981155481${i}${key}`}
      )
        .then(() => {
          expect(true).toBe(true);
          success++;
          if (success === randomText.length) done();
        })
        .catch((error: any) => {
          expect(error).toBe(null);
        });
    });
  });

  it(`should get a keys from random text db (items: ${randomText.length})`, (done: Function) => {
    let success: number = 0;
    randomText.forEach((text: string, i: number) => {
      const key: string = text;
      ddm.get('novels', key)
        .then((data) => {
          expect(data.title).toBe(`Novel; ${key}`);
          expect(data.price).toBe(i * 3.87);
          expect(data.isbn).toBe(`XXX9981155481${i}${key}`);
          success++;
          if (success === randomText.length) done();
        })
        .catch((error: any) => {
          expect(error).toBe(null);
        });
    });
  });

  // delete test

  it('should delete the book container', (done: Function) => {
    ddm.delContainer('books')
      .then(() => {
        expect(true).toBe(true);
        done();
      })
      .catch((error: any) => {
        expect(error).toBe(null);
        done();
      })
  });

  it('should node delete non existed containers', (done: Function) => {
    ddm.delContainer('books')
      .then(() => {
        expect(true).toBe(false);
        done();
      })
      .catch((error: any) => {
        expect(error).not.toBe(null);
        done();
      });
  });

  // clean up

  it('should clean up', (done: Function) => {
    ddm.delAll()
      .then(() => {
        expect(true).toBe(true);
        done();
      })
      .catch((error: any) => {
        expect(error).toBe(null);
        done();
      });
  });
});

