import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import useAuth from '@Hooks/useAuth';
import { verifyEmail } from '@Services/common';

import VerificationFailed from './VerificationFailed';
import EmailVerified from './Verified';
import EmailVerifying from './Verifying';

export default function EmailVerification() {
  const { token } = useParams();
  const navigate = useNavigate();
  const isAuthenticated = useAuth();
  const [verificationStatus, setVerificationStatus] = useState<
    'pending' | 'success' | 'error'
  >('pending');

  const { mutate: mutateVerifyEmail, isPending: isEmailVerifying } =
    useMutation({
      mutationFn: (payload: Record<string, any>) => verifyEmail(payload),
      onSuccess: () => {
        setTimeout(() => {
          setVerificationStatus('success');
        }, 2000);
      },
      onError: (error: any) => {
        const caughtError = error?.response?.data;
        if (caughtError.verificationStatus === 'failed') {
          setTimeout(() => {
            setVerificationStatus('error');
          }, 2000);
        }
      },
    });

  useEffect(() => {
    if (token) {
      mutateVerifyEmail({ token });
    }
  }, [token]);
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);

  const getVerificationStatus = () => {
    if (isEmailVerifying || verificationStatus === 'pending') {
      return <EmailVerifying />;
    } else if (verificationStatus === 'success') {
      return <EmailVerified />;
    } else {
      return <VerificationFailed />;
    }
  };
  return <>{getVerificationStatus()}</>;
}
