import { Loader2 } from 'lucide-react';

export default function EmailVerifying() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-purple-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-md">
        {/* Loading Icon */}
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-purple-100 p-3">
            <Loader2 size={36} className="animate-spin text-purple-600" />
          </div>
        </div>

        {/* Verification Message */}
        <h1 className="mb-4 text-2xl font-bold text-gray-800">
          Verifying Your Email
        </h1>

        <p className="mb-8 text-gray-600">
          Please wait while we verify your email address. This should only take
          a moment.
        </p>
      </div>
    </div>
  );
}
