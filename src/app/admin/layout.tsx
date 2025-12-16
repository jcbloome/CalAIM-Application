
'use client';

import { ReactNode, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { cn } from '@/lib/utils';
import { useAdmin } from '@/hooks/use-admin';
import { LayoutDashboard, List, Shield, Loader2, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const adminNavLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/activities', label: 'Activities', icon: List },
  { href: '/admin/super', label: 'Super Admin', icon: Shield, super: true },
];

function AdminSidebar() {
  const pathname = usePathname();
  const { isSuperAdmin } = useAdmin();

  return (
    <aside className="w-64 flex-shrink-0 border-r bg-card pr-4">
      <nav className="flex flex-col space-y-2 p-4">
        <h2 className="text-lg font-semibold tracking-tight px-2">Admin Menu</h2>
        <div className="space-y-1">
          {adminNavLinks.map(link => {
            if (link.super && !isSuperAdmin) return null;

            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                  isActive && 'bg-muted text-primary'
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}


export default function AdminLayout({ children }: { children: ReactNode }) {
    const { isAdmin, isSuperAdmin, isLoading, user } = useAdmin();
    const router = useRouter();

    useEffect(() => {
        // If loading is finished and there's no user, redirect to login.
        if (!isLoading && !user) {
            router.push('/login');
        }
    }, [isLoading, user, router]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="ml-4">Verifying access...</p>
            </div>
        );
    }
    
    // After loading, if there's a user but they are not an admin, show access denied.
    if (user && !isAdmin && !isSuperAdmin) {
        return (
            <>
            <Header />
             <main className="flex-grow flex items-center justify-center p-4">
                <Card className="w-full max-w-md text-center">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-center gap-2">
                            <Lock className="h-6 w-6 text-destructive" />
                            Access Denied
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>You do not have permission to view this page. Please contact an administrator if you believe this is an error.</p>
                    </CardContent>
                </Card>
            </main>
            </>
        );
    }

    // If there's no user yet (and not loading), we show nothing to prevent flicker before redirect.
    if (!user) {
        return null;
    }

  return (
    <>
      <Header />
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-grow p-4 sm:p-6 md:p-8 bg-slate-50/50">
            {children}
        </main>
      </div>
    </>
  );
}
