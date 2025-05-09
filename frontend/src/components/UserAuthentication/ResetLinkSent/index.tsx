import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CircleCheckBig } from 'lucide-react';

import CountdownTimer from '@Components/common/CountdownTimer';
import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import { Button } from '@Components/radix/Button';
import { useTypedSelector } from '@Store/hooks';
import { useSendPasswordResetEmail } from '@Api/UserAuthentication';

export default function ResetLinkSent() {
  const navigate = useNavigate();
  const userProfile = useTypedSelector(state => state.commonSlice.userProfile);
  const [timerValue, setTimerValue] = useState(0);

  useEffect(() => {
    if (!userProfile?.email) {
      navigate('/auth/login');
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

  const { mutate, isPending, isSuccess } = useSendPasswordResetEmail();

  const handleRequestNewLink = () => {
    mutate({
      email: userProfile?.email,
    });
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success('Verification email sent successfully.');
      setTimerValue(300);
    }
  }, [isSuccess]);

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
                Reset Link sent!
              </p>
              <p className="text-base font-medium text-gray-600">
                Please check your inbox to complete your password reset
              </p>
            </FlexColumn>
            <FlexColumn className="w-full items-center justify-center gap-1">
              <p className="text-md text-gray-500">Didn’t receive the email?</p>
              {timerValue !== 0 && (
                <p className="text-md text-gray-500">
                  You can request a new link in
                  <CountdownTimer
                    initialSeconds={timerValue}
                    onTimeUpdate={(seconds: number) => setTimerValue(seconds)}
                  />
                </p>
              )}
            </FlexColumn>
            <Button
              disabled={timerValue > 0 || isPending}
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
