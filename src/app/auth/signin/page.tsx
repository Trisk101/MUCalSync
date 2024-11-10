'use client';

import { useSearchParams } from 'next/navigation';
import LoginForm from '../../../components/LoginForm';

export default function SignIn() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const callbackUrl = searchParams.get('callbackUrl');

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            Authentication failed. Please try again.
          </div>
        )}
        <LoginForm />
      </div>
    </div>
  );
}