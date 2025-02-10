import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { v4 as uuidv4 } from 'uuid';

import fallBack1 from '@Assets/images/avatar-images.svg';
import fallBack2 from '@Assets/images/fallBack2.jpeg';

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

export function getStyle(selectedStyle: string) {
  switch (selectedStyle) {
    case 'grid':
      return 'grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5';
    case 'list':
      return 'flex flex-col gap-4 w-full';
    default:
      return '';
  }
}

export function rearrangeByRank(arr: any[]) {
  const rankOrder = [2, 1, 3];

  // Default object template
  const defaultObj = (rank: number) => ({
    user_id: null,
    name: 'N/A',
    total_score: 0,
    rank,
    previous_rank: null,
  });

  // Create a map of available ranks
  const rankMap = new Map(arr.map(item => [item.rank, item]));

  // Ensure the order is always 2 → 1 → 3, filling missing ranks
  return rankOrder.map(rank => rankMap.get(rank) || defaultObj(rank));
}

export const getFallBackImage = () => {
  const images = [fallBack1, fallBack2];
  return images[Math.floor(Math.random() * images.length)];
};
