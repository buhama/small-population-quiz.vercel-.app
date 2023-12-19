import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const numberIsInMiddle = (
	number: string | number,
	allNumbers: (string | number)[]
): boolean => {
	const _number = Number(number);
	const _allNumbers = allNumbers.map((n) => Number(n));
	const sorted = _allNumbers.sort((a, b) => a - b);
	console.log(_number, sorted[0], sorted[sorted.length - 1]);
	return _number > sorted[0] && _number < sorted[sorted.length - 1];
};

export const applyMargin = (
	number: string | number,
	allNumbers: (string | number)[]
): string => {
	const _number = Number(number);
	const _allNumbers = allNumbers.map((n) => Number(n));
	const sorted = _allNumbers.sort((a, b) => a - b);
	const index = sorted.indexOf(_number);
	if (index === 0) {
		return '-ml-8';
	}
	if (index === _allNumbers.length - 1) {
		return 'ml-4';
	}
	return 'hidden';
};