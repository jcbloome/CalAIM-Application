
import { notFound } from 'next/navigation';
import { initializeAdminApp } from '@/firebase/admin-init';
import { getFirestore } from 'firebase-admin/firestore';
import { ApplicationDetailClientView } from './ApplicationDetailClientView';
import type { Application } from '@/lib/definitions';

// This is now a Server Component. It fetches data on the server.
export default async function AdminApplicationDetailPage({ params, searchParams }: { params: { id: string }, searchParams: { userId?: string } }) {
  const { id } = params;
  const { userId } = searchParams;

  if (!id || !userId) {
    // If we don't have an ID or userId, we can't fetch the data.
    notFound();
  }

  let applicationData: Application | null = null;
  
  try {
    const adminApp = initializeAdminApp();
    const adminFirestore = getFirestore(adminApp);
    const docRef = adminFirestore.collection('users').doc(userId).collection('applications').doc(id);
    const docSnap = await docRef.get();

    if (docSnap.exists) {
      // Manually converting Firestore data to a plain object
      const data = docSnap.data();
      applicationData = {
        id: docSnap.id,
        ...data,
        // Convert Timestamps to ISO strings for serialization
        lastUpdated: data?.lastUpdated?.toDate().toISOString(),
        forms: data?.forms?.map((form: any) => ({
          ...form,
          dateCompleted: form.dateCompleted?.toDate().toISOString() || null,
        })),
      } as Application;
    }
  } catch (error) {
    console.error("Failed to fetch application data on server:", error);
    // If fetching fails, we can't render the page.
    notFound();
  }

  if (!applicationData) {
    notFound();
  }

  // Pass the server-fetched data to the client component.
  return <ApplicationDetailClientView initialApplication={applicationData} />;
}
