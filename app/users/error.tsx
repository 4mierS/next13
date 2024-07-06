'use client'; // Error components must be Client components

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const { data: session } = useSession();

    if (!session) {
        return (
            <div>  
                <h2>Something went wrong, you need to login!</h2>
                <button onClick={() => reset()}>Try again</button>
            </div>
        );
    } else {
        return (
            <div>
                <h2>Something went wrong, please try again later</h2>
                <button onClick={() => reset()}>Try again</button>
            </div>
        );
    }
}
