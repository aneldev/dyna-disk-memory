declare let describe: any, expect: any, it: any;
import loops from './loops';

let testObject = {
	fname: 'John',
	lname: 'Smith',
	age: 40,
};

describe('loops test', () => {

	it('should get the correct keys', () => {
		expect(loops.keys(testObject).length).toBe(3);
		expect(loops.hasValues(loops.keys(testObject), ['age', 'lname', 'fname'])).toBe(true);
	});

	it('should get the correct values', () => {
		expect(loops.hasValues(loops.values(testObject), ['Smith', 'John', 40])).toBe(true);
	});

	it('should have values', () => {
		expect(loops.hasValues(loops.values(testObject), ['Smith', 'John', 40])).toBe(true);
	});

	it('should have correct keyValues', () => {
		let output=loops.keyValues(testObject);
		expect(output[0].key).toBe('fname');
		expect(output[1].key).toBe('lname');
		expect(output[2].key).toBe('age');
		expect(output[0].value).toBe('John');
		expect(output[1].value).toBe('Smith');
		expect(output[2].value).toBe(40);
	});

	it('should get the correct key using the keyForValue', ()=>{
		expect(loops.keyForValue(testObject,'John')).toBe('fname');
		expect(loops.keyForValue(testObject,'Smith')).toBe('lname');
		expect(loops.keyForValue(testObject,40)).toBe('age');
		expect(loops.keyForValue(testObject,'xxxx')).toBe(undefined);

	});

	it('should hasValues return false is not of all values exists', () => {
		expect(loops.hasValues(loops.values(testObject), ['Smith', 'John', 32])).toBe(false);
	});

	it('should have some values', () => {
		expect(loops.hasSomeValues(loops.values(testObject), ['Smith', 'John'])).toBe(true);
	});

	it('should return false hasSomeValues is none value exists', () => {
		expect(loops.hasSomeValues(loops.values(testObject), ['SmithXXX', 'JohnXXX'])).toBe(false);
	});

	it('should forLoop iterate correct', () => {
		let output = '';
		loops.forLoop(3, 6, ((iterator: number) => output += iterator));
		expect(output).toBe('3456');
	});

	it('should forLoop iterate correct using also stop', () => {
		let output = '';
		loops.forLoop(3, 10, ((iterator: number, stop: Function) => {
			if (iterator === 6) stop(); else output += iterator;
		}));
		expect(output).toBe('345');
	});

	it('should forTimes iterate correct', () => {
		let output = '';
		loops.forTimes(6, ((iterator: number) => output += iterator));
		expect(output).toBe('012345');
	});

	it('should forTimes iterate correct using also stop', () => {
		let output = '';
		loops.forTimes(10, ((iterator: number, stop: Function): void => {
			if (iterator < 6) output += iterator; else stop();
		}));
		expect(output).toBe('012345');
	});


});
