
'use client';

import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { useUser, useFirestore } from '@/firebase';

interface AdminStatus {
  isAdmin: boolean;
  isSuperAdmin: boolean;
  isLoading: boolean;
}

export function useAdmin(): AdminStatus & { user: ReturnType<typeof useUser>['user'] } {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const [adminStatus, setAdminStatus] = useState<AdminStatus>({
    isAdmin: false,
    isSuperAdmin: false,
    isLoading: true, // Start in a loading state
  });

  useEffect(() => {
    // If the user object is still loading, we are definitely in a loading state.
    if (isUserLoading) {
      setAdminStatus({ isAdmin: false, isSuperAdmin: false, isLoading: true });
      return;
    }

    // If user loading is finished but there's no user or no firestore, we're done loading.
    if (!user || !firestore) {
      setAdminStatus({ isAdmin: false, isSuperAdmin: false, isLoading: false });
      return;
    }

    // At this point, we have a user and firestore, so we start checking roles.
    // We set isLoading to true until both role checks complete.
    setAdminStatus(prev => ({ ...prev, isLoading: true }));

    const adminRef = doc(firestore, 'roles_admin', user.uid);
    const superAdminRef = doc(firestore, 'roles_super_admin', user.uid);

    let isAdmin = false;
    let isSuperAdmin = false;

    // Use a counter to track when both listeners have fired once.
    let checksCompleted = 0;
    const totalChecks = 2;

    const onCheckComplete = () => {
      checksCompleted++;
      if (checksCompleted === totalChecks) {
        setAdminStatus({ isAdmin, isSuperAdmin, isLoading: false });
      }
    };

    const unsubAdmin = onSnapshot(adminRef, (doc) => {
      isAdmin = doc.exists();
      onCheckComplete();
    }, () => {
      isAdmin = false;
      onCheckComplete();
    });

    const unsubSuperAdmin = onSnapshot(superAdminRef, (doc) => {
      isSuperAdmin = doc.exists();
      onCheckComplete();
    }, () => {
      isSuperAdmin = false;
      onCheckComplete();
    });

    // Cleanup function to unsubscribe from listeners on component unmount
    return () => {
      unsubAdmin();
      unsubSuperAdmin();
    };
  }, [user, isUserLoading, firestore]);

  return { ...adminStatus, user };
}
