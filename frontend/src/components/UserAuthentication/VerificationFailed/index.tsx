import React from 'react';
import { AlertCircle } from 'lucide-react';

const VerificationFailed: React.FC = () => {
  return (
    <div className="absolute left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white p-8 text-center shadow-md">
      {/* Error Icon */}
      <div className="mb-6 flex justify-center">
        <div className="rounded-full bg-red-100 p-3">
          <AlertCircle size={36} className="text-red-600" />
        </div>
      </div>

      {/* Error Message */}
      <h1 className="mb-4 text-2xl font-bold text-gray-800">
        Verification Failed
      </h1>

      <p className="mb-8 text-gray-600">
        The verification link has expired or is invalid.
      </p>
    </div>
  );
};

export default VerificationFailed;
