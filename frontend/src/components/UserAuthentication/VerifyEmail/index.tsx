import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircleCheckBig } from 'lucide-react';

import CountdownTimer from '@Components/common/CountdownTimer';
import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import { Button } from '@Components/radix/Button';
import useAuthStore from '@Store/auth';
import { useSendVerificationEmail } from '@Api/UserAuthentication';

export default function VerifyEmail() {
  const navigate = useNavigate();
  const userProfile = useAuthStore(state => state.userProfile);

  useEffect(() => {
    if (!userProfile?.email) {
      navigate('/login');
    }
    const listener = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', listener);

    return () => {
      window.removeEventListener('beforeunload', listener);
    };
  }, [navigate, userProfile?.email]);

  const {
    mutate: sendVerificationEmail,
    isPending: sendingVerificationEmail,
    timerValue,
    handleTimerUpdate,
  } = useSendVerificationEmail();

  const handleRequestNewLink = () => {
    sendVerificationEmail({
      email: userProfile?.email,
      name: userProfile?.name,
    });
  };

  return (
    <FlexRow className="h-full items-center justify-center px-4">
      <FlexColumn className="items-center justify-center gap-6">
        <p className="select-none text-5xl font-semibold text-primary-700">
          MockSewa
        </p>
        <FlexColumn className="w-full gap-6 rounded-lg bg-white p-6 text-center">
          <div className="mx-auto h-fit w-fit rounded-full bg-green-100 p-2">
            <CircleCheckBig className="mx-auto h-10 w-10 text-green-500" />
          </div>
          <FlexColumn className="w-full gap-6">
            <FlexColumn className="gap-2">
              <p className="text-lg font-semibold text-gray-700">
                Verification email sent!
              </p>
              <p className="text-base font-medium text-gray-600">
                Please check your inbox to complete your registration
              </p>
            </FlexColumn>
            <FlexColumn className="w-full items-center justify-center gap-1">
              <p className="text-md text-gray-500">Didn’t receive the email?</p>
              {timerValue !== 0 && (
                <p className="text-md text-gray-500">
                  You can request a new link in
                  <CountdownTimer
                    initialSeconds={timerValue}
                    onTimeUpdate={handleTimerUpdate}
                  />
                </p>
              )}
            </FlexColumn>
            <Button
              disabled={timerValue > 0 || sendingVerificationEmail}
              onClick={handleRequestNewLink}
              className="mx-auto w-fit"
            >
              Request New Link
            </Button>
          </FlexColumn>
        </FlexColumn>
        <p className="items-center text-sm text-gray-500">
          © {new Date().getFullYear()} MockSewa. All rights reserved.
        </p>
      </FlexColumn>
    </FlexRow>
  );
}
