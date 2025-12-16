
'use client';

import { useState, useEffect } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useAuth } from '@/firebase/provider';

export interface UserHookResult {
  user: User | null;
  isUserLoading: boolean;
  userError: Error | null;
}

export const useUser = (): UserHookResult => {
  const auth = useAuth();
  const [userState, setUserState] = useState<UserHookResult>(() => {
    const isLoading = auth ? !auth.currentUser : true;
    return {
      user: auth?.currentUser || null,
      isUserLoading: isLoading,
      userError: null,
    };
  });

  useEffect(() => {
    if (!auth) {
      // If auth service isn't available, we are not loading and there's an error.
      setUserState({ user: null, isUserLoading: false, userError: new Error("Auth service not available.") });
      return;
    }

    // Start with loading state true until the first auth state check completes.
    setUserState(s => ({...s, isUserLoading: true}));

    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        // Auth state has been confirmed, loading is false.
        setUserState({ user: firebaseUser, isUserLoading: false, userError: null });
      },
      (error) => {
        console.error("useUser: onAuthStateChanged error:", error);
        setUserState({ user: null, isUserLoading: false, userError: error });
      }
    );

    return () => unsubscribe();
  }, [auth]); // Rerun effect if the auth instance changes.

  return userState;
};
