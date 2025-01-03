import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { v4 as uuidv4 } from 'uuid';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertFileUrlToFileArray(url: Record<string, any>) {
  const fileArray = url.split('/');
  const fileName = fileArray[fileArray.length - 1];
  return [
    {
      id: uuidv4(),
      file: { name: fileName },
      previewURL: url,
    },
  ];
}

/**
 * This TypeScript function removes an object from an array at a specified index and returns a new
 * array.
 * @param {T[]} array - An array of elements of type T.
 * @param {number} index - The index parameter is a number that represents the position of the object
 * to be removed from the array. It should be a non-negative integer that is less than the length of
 * the array.
 * @returns a new array with the object at the specified index removed. If the index is out of bounds,
 * the function returns the original array.
 */
export function removeObjectAtIndex<T>(array: T[], index: number): T[] {
  if (index < 0 || index >= array.length) {
    // Index is out of bounds, return the original array
    return array;
  }

  // Create a new array with the object at the specified index removed
  const newArray = [...array.slice(0, index), ...array.slice(index + 1)];

  return newArray;
}
