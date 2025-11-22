
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const mascot = PlaceHolderImages.find(p => p.id === 'fox-mascot');
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  // Redirect based on auth state
  // useEffect(() => {
  //   if (!isUserLoading) {
  //     if (user) {
  //       router.replace('/applications');
  //     } else {
  //       router.replace('/login');
  //     }
  //   }
  // }, [user, isUserLoading, router]);

  return (
    <main className="flex-grow flex items-center justify-center p-4 sm:p-6 md:p-8">
      <Card className="w-full max-w-lg shadow-2xl">
        <CardHeader className="items-center text-center p-6">
          {mascot && (
            <Image
              src={mascot.imageUrl}
              alt={mascot.description}
              width={150}
              height={150}
              data-ai-hint={mascot.imageHint}
              className="w-36 h-36 object-contain rounded-full mb-4"
            />
          )}
          <CardTitle className="text-4xl font-bold">Connect CalAIM</CardTitle>
          <CardDescription className="text-base max-w-md">
            The Connections Care Home Consultants application portal for the California
            Advancing and Innovating Medi-Cal (CalAIM) Community Support for Assisted
            Transitions (SNF Diversion/Transition) for Health Net and Kaiser.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center p-6 pt-0">
           <Button asChild size="lg">
              <Link href="/info">Let's Go! <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
        </CardContent>
      </Card>
    </main>
  );
}
