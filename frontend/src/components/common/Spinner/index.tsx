import React from 'react';
import { Loader2 } from 'lucide-react';

const Spinner = () => {
  return (
    <div className="absolute left-1/2 right-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <Loader2 className="h-8 w-8 animate-spin text-primary-700" />
    </div>
  );
};

export default Spinner;
