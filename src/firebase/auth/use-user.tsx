
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
  const [userState, setUserState] = useState<UserHookResult>(() => ({
    user: auth?.currentUser || null,
    isUserLoading: !auth?.currentUser,
    userError: null,
  }));

  useEffect(() => {
    if (!auth) {
      if (!userState.userError) { // Prevent setting error repeatedly
        setUserState(s => ({ ...s, isUserLoading: false, userError: new Error("Auth service not available.") }));
      }
      return;
    }

    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        setUserState({ user: firebaseUser, isUserLoading: false, userError: null });
      },
      (error) => {
        console.error("useUser: onAuthStateChanged error:", error);
        setUserState({ user: null, isUserLoading: false, userError: error });
      }
    );

    return () => unsubscribe();
  }, [auth]); // Dependency on auth instance is correct

  return userState;
};
