// help: https://facebook.github.io/jest/docs/expect.html
import {mkdir} from "dyna-node-fs";

declare let jasmine: any, describe: any, expect: any, it: any;
if (typeof jasmine !== 'undefined') jasmine.DEFAULT_TIMEOUT_INTERVAL = 25000;

import {isNode, env} from 'dyna-universal';
import {DynaDiskMemory} from '../../src';
import {forTimes} from 'dyna-loops'
import {randomTextBig, randomTextSmall} from '../utils/randomText';

const STRESS_MODE: Boolean = false; // default for this test: true

const TEST_ITEMS_AMOUNT: number = STRESS_MODE ? 100 : 5;
const PERFORM_DISK_DELAY: number = STRESS_MODE ? 100 : 2;

const createTest = (forNode: boolean) => {
  // localStorage polyfill
  if (!forNode && (typeof env.localStorage === "undefined" || env.localStorage === null)) {
    const LocalStorage = require('node-localstorage').LocalStorage;
    mkdir('./temp/localStoragePolyfill');
    env.localStorage = new LocalStorage('./temp/localStoragePolyfill', 1000000); // no limit, we test the library not the localStorage
  }
  let randomText: string[] = forNode ? randomTextBig : randomTextSmall;

  let ddm: DynaDiskMemory = new DynaDiskMemory({
    diskPath: './temp/dynaDiskMemoryTest',
    _test_workForBrowser: !forNode,
  });
  ddm._test_performDiskDelay = PERFORM_DISK_DELAY;

  describe('Dyna disk test for ' + (forNode ? 'node' : 'browser'), () => {

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

    // get test

    it('should get undefined for unknown keys', (done: Function) => {
      ddm.get('books', '#key-that-does-no-exist')
        .then((data: any) => {
          expect(data).toBe(undefined);
          done();
        })
        .catch((error: any) => {
          expect(error).toBe(null);
          done();
        });
    });

    // write and rewrite shorter key

    it('should set a key with big data size', (done: Function) => {
      ddm.set(
        'books', '#305986703624',
        {
          title: 'Gone with the wind', pages: 2000, price: 23.23, isbn: '02760245N4353',
          someBigData: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        }
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

    it('should set again the same key with smaller data size', (done: Function) => {
      ddm.set(
        'books', '#305986703624',
        {title: 'Gone with the wind', pages: 2000, price: 23.23}
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

    it('should get the key with the smaller data size correctly', (done: Function) => {
      ddm.get('books', '#305986703624')
        .then((data: any) => {
          expect(data.title).toBe('Gone with the wind');
          expect(data.pages).toBe(2000);
          expect(data.price).toBe(23.23);
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
          .then((data: any) => {
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
          expect(data).toBe(undefined);
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
          .then((data: any) => {
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
          .then((data: any) => {
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
          .then((data: any) => {
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

    it('should not raise error deleting non existed containers', (done: Function) => {
      ddm.delContainer('books')
        .then(() => {
          expect(true).toBe(true);  // wrong case
          done();
        })
        .catch((error: any) => {
          expect(error).toBe(null);
          done();
        });
    });

  });

};

// RUN test tests

// if the test runs under node, then test the DynaDiskMemoryForNode
if (isNode()) createTest(true);

// regardless the environment, test the DynaDiskMemoryForBrowser
// (in case of node.js the localStorage polyfill will be applied)
createTest(false);
