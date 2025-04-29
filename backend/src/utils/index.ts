export const getStartOfDay = () => {
  const today = new Date();
  return new Date(today.setHours(0, 0, 0, 0));
};

export const getEndOfDay = () => {
  const today = new Date();
  return new Date(today.setHours(23, 59, 59, 999));
};

export const getStartOfWeek = () => {
  const today = new Date();
  return new Date(today.setDate(today.getDate() - today.getDay()));
};

export const getEndOfWeek = () => {
  const today = new Date();
  return new Date(today.setDate(today.getDate() - today.getDay() + 6));
};

export const getStartOfMonth = () => {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), 1);
};

export const getEndOfMonth = () => {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth() + 1, 0);
};

export const getStartDate = (dateType: string) => {
  let startDate = new Date();
  if (dateType === 'daily') {
    startDate = getStartOfDay();
  } else if (dateType === 'weekly') {
    startDate = getStartOfWeek();
  } else if (dateType === 'monthly') {
    startDate = getStartOfMonth();
  }
  return startDate;
};

export function getStartDateByTimePeriod(time_period: string) {
  const startDate = new Date();
  switch (time_period) {
    case 'last_7_days':
      startDate.setDate(startDate.getDate() - 7);
      break;
    case 'last_30_days':
      startDate.setDate(startDate.getDate() - 30);
      break;
    case 'all_time':
      return 'all_time';
  }
  return startDate;
}

export function formatToMinSec(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}
