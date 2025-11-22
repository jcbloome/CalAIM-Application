'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Users,
  LayoutGrid,
  BarChart,
  Activity,
  FileCheck2,
  PawPrint,
  ShieldAlert,
} from 'lucide-react';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { useUser } from '@/firebase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const menuItems = [
  { href: '/admin/applications', label: 'Applications', icon: Users },
  { href: '/admin/application-statistics', label: 'Statistics', icon: BarChart },
  { href: '/admin/tracker', label: 'Tracker', icon: FileCheck2 },
  { href: '/admin/activity-log', label: 'Activity Log', icon: Activity },
];

// Hardcoded admin email
const ADMIN_EMAIL = 'jason.bloome@example.com';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  if (isUserLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    router.push('/login');
    return null;
  }
  
  const isAuthorized = user.email === ADMIN_EMAIL;

  if (!isAuthorized) {
    return (
      <div className="flex items-center justify-center h-screen bg-muted/40">
        <Card className="w-full max-w-md text-center">
            <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                    <ShieldAlert className="h-6 w-6 text-destructive" />
                    Access Denied
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p>You are not authorized to view this page.</p>
                <Button asChild className="mt-4">
                    <Link href="/applications">Go to My Applications</Link>
                </Button>
            </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
            <PawPrint className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-semibold">Admin Panel</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <a>
                      <item.icon />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <main className="flex-1">
        <div className="border-b p-4">
            {/* Can be a header bar for mobile or other controls */}
        </div>
        <div className="p-4 sm:p-6">{children}</div>
      </main>
    </SidebarProvider>
  );
}
