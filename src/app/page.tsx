import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const wolfMascot = PlaceHolderImages.find(p => p.id === 'wolf-mascot');

  return (
    <main className="flex-grow flex items-center justify-center p-4 sm:p-6 md:p-8">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="items-center text-center p-6">
          {wolfMascot && (
            <Image
              src={wolfMascot.imageUrl}
              alt={wolfMascot.description}
              width={600}
              height={400}
              data-ai-hint={wolfMascot.imageHint}
              className="w-48 h-32 object-cover rounded-lg mb-4"
            />
          )}
          <CardTitle className="text-3xl font-bold text-primary">Connect CalAIM</CardTitle>
          <CardDescription className="text-base">
            A portal for the CalAIM Community Support for Assisted Transitions for Health Net and Kaiser.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center p-6 pt-0">
          <Button asChild size="lg" className="w-full">
            <Link href="/info">
              Let&apos;s Go!
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
