'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import router from 'next/router';

export default function SuccessPage() {
  const { data: session } = useSession();

  useEffect(() => {
    const createCalendarEvent = async () => {
      try {
        const syncResponse = await fetch('/api/calendar/sync', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!syncResponse.ok) {
          throw new Error('Failed to sync calendar');
        }

        const data = await syncResponse.json();
        console.log('Calendar sync successful:', data);
      } catch (error) {
        console.error('Calendar sync failed:', error);
      }
    };

    if (session) {
      createCalendarEvent();
    }
  }, [session]);

  return (
    <div className="relative min-h-screen">
      {/* Reuse the background blobs from home page */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[50vw] top-[50vh] -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-r dark:from-blue-500/30 dark:to-purple-500/30 from-blue-300/40 to-sky-300/40 rounded-[60%_40%_70%_30%] blur-3xl animate-blob-1" />
        <div className="absolute left-[50vw] top-[50vh] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r dark:from-red-500/30 dark:to-pink-500/30 from-orange-300/40 to-yellow-300/40 rounded-[70%_30%_50%_50%] blur-3xl animate-blob-2" />
      </div>

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center p-8">
        <div className="max-w-2xl w-full space-y-8 backdrop-blur-lg bg-white/20 dark:bg-black/20 p-8 rounded-2xl border border-black/10 dark:border-white/10">
          <div className="flex items-center justify-center">
                <svg 
                  className="w-16 h-16 text-green-500" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold dark:text-white text-gray-900">
                Successfully Connected!
              </h2>
              <p className="dark:text-gray-300 text-gray-600">
                Your MUERP calendar has been synced with Google Calendar.
              </p>
              <p className="dark:text-gray-300 text-sm space-x-2">
                <span>Having trouble syncing? </span>
                <button
                  onClick={() => {
                    router.push('/');
                  }}
                  className="text-blue-400 hover:text-blue-500 transition-colors duration-200"
                >
                  Try again
                </button>
                <span>or</span>
                <a
                  href="mailto:mark.atharv@gmail.com?subject=MU Calendar Sync Support"
                  className="text-blue-400 hover:text-blue-500 transition-colors duration-200"
                >
                  contact us
                </a>
              </p>
        </div>
      </main>
    </div>
  );
} 