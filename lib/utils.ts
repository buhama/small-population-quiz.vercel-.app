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