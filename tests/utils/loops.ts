// a lightweight loops library

export const keys = (obj: any): string[] => Object.keys(obj);

export const values = (obj: any): any[] => Object.keys(obj).map((key: string) => obj[key]);

export interface IKeyValuePair {
	key: string,
	value: any
}
export const keyValues = (obj: any): IKeyValuePair[] => Object.keys(obj).map((key: string) => ({key, value: obj[key]}));

export const forKeys = (obj: any, cb: (value: any, index: number, array: any[]) => void): void => keys(obj).forEach(cb);

export const forValues = (obj: any, cb: (value: any, index: number, array: any[]) => void): void => values(obj).forEach(cb);

export const keyForValue = (obj: any, value: any) => {
	let found: IKeyValuePair = keyValues(obj).find((kvp: IKeyValuePair) => kvp.value === value);
	return found && found.key;
};

export const forLoop = (start: number, end: number, cb: (iterator: number, stop: () => void) => void): void => {
	let stop: boolean = false;
	for (let iterator: number = start; !stop && iterator <= end; iterator++)
		cb(iterator, () => stop = true);
};
export const forTimes = (times: number, cb: (iterator: number, stop: () => void) => void): void => {
	forLoop(0, times - 1, cb);
};

export const hasValue = (array: any[], value: any): boolean => array.indexOf(value) > -1;

export const hasValues = (array: any[], values: any[]): boolean => {
	let foundValues: number = 0;
	values.forEach((value: any) => {
		if (hasValue(array, value)) foundValues++;
	});
	return foundValues === values.length;
};

export const hasSomeValues = (array: any[], values: any[]): boolean => {
	let foundValues: number = 0;
	values.forEach((value: any) => {
		if (hasValue(array, value)) foundValues++;
	});
	return foundValues > 0;
};

export default {
	keys,
	values,
	keyValues,
	keyForValue,
	forKeys,
	forValues,
	forLoop,
	forTimes,
	hasValue,
	hasValues,
	hasSomeValues,
}
