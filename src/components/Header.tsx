import Link from 'next/link';
import { PawPrint } from 'lucide-react';
import { Button } from './ui/button';

export function Header() {
  return (
    <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-40">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary">
          <PawPrint className="h-6 w-6" />
          <span>CalAIM Pathfinder</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/applications">My Applications</Link>
          </Button>
          <Button asChild>
            <Link href="/forms/cs-summary-form">Start New Application</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
