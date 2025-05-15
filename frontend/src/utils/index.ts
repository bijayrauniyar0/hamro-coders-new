import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { v4 as uuidv4 } from 'uuid';

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
  return fallBack2;
};

export const calculatePercentage = (value: number, total: number) => {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
};

export const getPercentageColor = (value: number, total: number) => {
  const percentage = calculatePercentage(value, total);
  switch (true) {
    case percentage === 0:
      return 'text-red-500';
    case percentage <= 25:
      return 'text-orange-500';
    case percentage <= 50:
      return 'text-yellow-500';
    case percentage <= 75:
      return 'text-green-500';
    case percentage <= 100:
      return 'text-green-700';
    default:
      return 'text-gray-500';
  }
};

export function getDisplayedRowCount(data: any): number {
  let allData: any[] = [];
  data?.forEach((element: Record<string, any>) => {
    allData = [...(element?.results || []), ...allData];
  });
  return allData.length;
}

export function chunkArray(arr: any[], chunkSize = 4) {
  const result = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }
  return result;
}

export const getGlobalIndex = (
  questionsChunk: any[],
  chunkIndex: number,
  questionIndex: number,
) => {
  return (
    questionsChunk
      .slice(0, chunkIndex)
      .reduce((acc, chunk) => acc + chunk.length, 0) + questionIndex
  );
};

export const getElapsedTimeInSeconds = (startTime: Date) => {
  const now = new Date();
  const elapsedMs = now.getTime() - startTime.getTime();
  const elapsedSeconds = Math.floor(elapsedMs / 1000);
  return elapsedSeconds;
};

export const formatDate = (date: string) => {
  const createdAt = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - createdAt.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  } else if (diffDays < 7) {
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  } else {
    return createdAt.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });
  }
};

export const getFormattedDate = (date: string) => {
  const createdAt = new Date(date);
  return createdAt.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
};

export const getInitialsFromName = (name: string = '') => {
  const nameParts = name.split(' ');
  if (nameParts.length === 1) {
    return nameParts[0].charAt(0).toUpperCase();
  } else if (nameParts.length > 1) {
    const firstInitial = nameParts[0].charAt(0).toUpperCase();
    const lastInitial = nameParts[nameParts.length - 1].charAt(0).toUpperCase();
    return `${firstInitial}${lastInitial}`;
  }
  return '';
};
