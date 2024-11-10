'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="max-w-md w-full space-y-8">
      <div className="text-center">
        <h2 className="mt-6 text-3xl font-bold text-gray-900">
          Authentication Error
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          {error === 'AccessDenied' 
            ? 'You need to allow calendar access to use this application.'
            : 'An error occurred during authentication.'}
        </p>
      </div>
      <div className="mt-4 text-center">
        <Link
          href="/auth/signin"
          className="text-blue-600 hover:text-blue-800"
        >
          Try Again
        </Link>
      </div>
    </div>
  );
}

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorContent />
      </Suspense>
    </div>
  );
}