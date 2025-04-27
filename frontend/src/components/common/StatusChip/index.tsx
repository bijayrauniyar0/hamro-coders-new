import React from 'react';

import { cn } from '@Utils/index';

type StatusType = 'success' | 'warning' | 'error' | 'info' | 'default';

interface StatusChipProps {
  label: string;
  status?: StatusType;
}

const statusColors: Record<StatusType, string> = {
  success: 'bg-green-100 text-green-500',
  warning: 'bg-yellow-100 text-yellow-500',
  error: 'bg-red-100 text-red-500',
  info: 'bg-blue-100 text-blue-500',
  default: 'bg-gray-100 text-gray-500',
};

const StatusChip: React.FC<StatusChipProps> = ({
  label,
  status = 'default',
}) => {
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full px-3 py-1',
        statusColors[status],
      )}
    >
      <p className="text-xs font-medium capitalize md:text-sm">{label}</p>
    </div>
  );
};

export default StatusChip;
