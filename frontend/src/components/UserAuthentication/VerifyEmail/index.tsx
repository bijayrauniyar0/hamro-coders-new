import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CountdownTimer from '@Components/common/CountdownTimer';
import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import { Button } from '@Components/radix/Button';
import { useTypedSelector } from '@Store/hooks';

export default function EmailVerified() {
  const navigate = useNavigate();
  const [timerValue, setTimerValue] = useState<number>(120);
  const userProfile = useTypedSelector(state => state.commonSlice.userProfile);

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
  }, []);

  const handleTimerUpdate = (newTime: number) => {
    setTimerValue(newTime);
  };
  return (
    <FlexRow className="h-full items-center justify-center px-6">
      <FlexColumn className="w-full gap-6 rounded-lg border border-gray-300 bg-white p-7 text-center shadow-lg">
        <p className="select-none text-5xl font-semibold text-primary-700">
          MockSewa
        </p>
        <FlexColumn className="w-full gap-6">
          <div className="w-full">
            <p className="text-lg text-gray-600">
              Verification email sent! Please check your inbox.
            </p>
            <p className="text-sm text-gray-500">
              Didn’t receive the email? You can request a new link in
              <CountdownTimer
                initialSeconds={timerValue}
                onTimeUpdate={handleTimerUpdate}
              />
            </p>
          </div>
          <Button disabled={timerValue > 0} className="mx-auto w-fit">
            Request New Link
          </Button>
        </FlexColumn>
      </FlexColumn>
    </FlexRow>
  );
}
