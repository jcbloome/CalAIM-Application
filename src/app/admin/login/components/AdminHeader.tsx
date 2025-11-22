
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function AdminHeader() {
  const logo = PlaceHolderImages.find(p => p.id === 'calaim-logo');

  return (
    <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-40">
      <div className="container mx-auto flex items-center justify-between h-20 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary">
          {logo && (
            <Image 
              src={logo.imageUrl}
              alt={logo.description}
              width={250}
              height={50}
              priority
              className="object-contain"
            />
          )}
        </Link>
        {/* No navigation links in the admin header */}
      </div>
    </header>
  );
}
