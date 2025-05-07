import { useParams } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

import CountdownTimer from '@Components/common/CountdownTimer';
import { Button } from '@Components/radix/Button';
import { useSendVerificationEmail } from '@Api/UserAuthentication';

export default function VerificationFailed() {
  const { token } = useParams();
  const {
    mutate: sendVerificationEmail,
    isPending: sendingVerificationEmail,
    timerValue,
    handleTimerUpdate,
  } = useSendVerificationEmail();

  const handleRequestNewLink = () => {
    sendVerificationEmail({ token });
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-purple-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-md">
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

        {timerValue !== 0 && (
          <p className="text-md text-gray-500">
            You can request a new link in
            <CountdownTimer
              initialSeconds={timerValue}
              onTimeUpdate={handleTimerUpdate}
            />
          </p>
        )}
        <Button
          disabled={timerValue > 0 || sendingVerificationEmail}
          onClick={handleRequestNewLink}
          className="mx-auto w-fit"
        >
          Request New Link
        </Button>
      </div>
    </div>
  );
}
