
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Users,
  BarChart,
  Activity,
  FileCheck2,
  ShieldAlert,
  LogOut,
  UserCog,
  Loader2,
  Menu,
} from 'lucide-react';
import { useUser, useAuth, useFirestore } from '@/firebase';
import imageData from '@/lib/placeholder-images.json';
import { doc, getDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/admin/applications', label: 'Applications', icon: Users },
  { href: '/admin/application-statistics', label: 'Statistics', icon: BarChart },
  { href: '/admin/form-tracker', label: 'Form Tracker', icon: FileCheck2 },
  { href: '/admin/activity-log', label: 'Activity Log', icon: Activity },
];

const superAdminLinks = [
    { href: '/admin/super', label: 'Super Admin', icon: ShieldAlert },
];


function AdminHeader({ isSuperAdmin }: { isSuperAdmin: boolean }) {
    const { user } = useUser();
    const auth = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [isSheetOpen, setSheetOpen] = useState(false);
    const mascot = imageData.placeholderImages.find(p => p.id === 'fox-mascot');

    const handleSignOut = async () => {
        if (auth) {
            await auth.signOut();
        }
        router.push('/admin/login');
    };
    
    const allNavLinks = isSuperAdmin ? [...navLinks, ...superAdminLinks] : navLinks;

    return (
        <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-40">
            <div className="container mx-auto flex items-center justify-between h-20 px-4 sm:px-6">
                 <Link href="/admin" className="flex items-center gap-2 font-bold text-lg text-primary">
                    {mascot && <Image src={mascot.imageUrl} alt={mascot.description} width={40} height={40} className="w-10 h-10 object-contain rounded-full" />}
                    <span>Admin Panel</span>
                </Link>

                <nav className="hidden md:flex items-center gap-1">
                    {allNavLinks.map(link => (
                         <Button key={link.href} variant={pathname.startsWith(link.href) ? 'secondary' : 'ghost'} asChild>
                            <Link href={link.href}>
                                <link.icon className="mr-2 h-4 w-4" />
                                {link.label}
                            </Link>
                        </Button>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" className="rounded-full">
                          <UserCog className="h-5 w-5" />
                          <span className="sr-only">User menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>{user?.displayName || user?.email}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleSignOut}>
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Log out</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    
                    <div className="md:hidden">
                        <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent>
                                <nav className="flex flex-col gap-4 py-8">
                                    {allNavLinks.map(link => (
                                         <Link key={link.href} href={link.href} className={cn("flex items-center gap-3 rounded-lg p-3 text-muted-foreground transition-all hover:text-primary", pathname.startsWith(link.href) && "bg-muted text-primary" )} onClick={() => setSheetOpen(false)}>
                                            <link.icon className="h-4 w-4" />
                                            {link.label}
                                        </Link>
                                    ))}
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}


function AdminAuthLoading() {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 font-sans">
        <div className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center gap-4 w-full max-w-md">
            <div className="flex items-center gap-4">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <h2 className="text-xl font-semibold">Verifying Admin Access...</h2>
            </div>
        </div>
      </div>
    );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [isCheckingRole, setIsCheckingRole] = useState(true);

  useEffect(() => {
    if (isUserLoading) {
      return;
    }

    if (!user) {
      if (pathname !== '/admin/login') {
        router.push('/admin/login');
      }
      setIsCheckingRole(false);
      return;
    }

    const checkAdminStatus = async () => {
      if (firestore && user) {
        const adminDocRef = doc(firestore, 'roles_admin', user.uid);
        const superAdminDocRef = doc(firestore, 'roles_super_admin', user.uid);
        
        const [adminDocSnap, superAdminDocSnap] = await Promise.all([
            getDoc(adminDocRef),
            getDoc(superAdminDocRef)
        ]);

        const hasAdminRole = adminDocSnap.exists();
        const hasSuperAdminRole = superAdminDocSnap.exists();

        if (hasAdminRole || hasSuperAdminRole) {
          setIsAdmin(true);
          setIsSuperAdmin(hasSuperAdminRole);
        } else {
          if (auth) await auth.signOut();
          router.push('/admin/login');
        }
      }
      setIsCheckingRole(false);
    };

    checkAdminStatus();
  }, [user, isUserLoading, firestore, auth, router, pathname]);

  
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (isCheckingRole || !isAdmin) {
    return <AdminAuthLoading />;
  }

  return (
    <>
        <AdminHeader isSuperAdmin={isSuperAdmin} />
        <main className="container mx-auto flex-1 p-4 sm:p-6">{children}</main>
    </>
  );
}
