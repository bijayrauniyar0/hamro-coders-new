import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

import { Button } from '@Components/radix/Button';

export default function EmailVerified() {
  const navigate = useNavigate();
  return (
    <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-md">
      {/* Success Icon */}
      <div className="mb-6 flex justify-center">
        <div className="rounded-full bg-purple-100 p-3">
          <CheckCircle size={36} className="text-purple-600" />
        </div>
      </div>

      {/* Success Message */}
      <h1 className="mb-4 text-2xl font-bold text-gray-800">Email Verified!</h1>

      <p className="mb-8 text-center text-gray-600">
        Your email address has been successfully verified. <br /> You can now
        proceed to login.
      </p>
      <p className="mb-8 font-semibold text-gray-700">
        Navigating to Login ...
      </p>

      {/* Login Button */}
      <Button onClick={() => navigate('/login')}>Proceed to Login</Button>
    </div>
  );
}
