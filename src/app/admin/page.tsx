
'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BarChart } from 'lucide-react';

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Main Dashboard</h1>
        <p className="text-lg text-muted-foreground mt-2">Welcome to the central backend for CalAIM Pathfinder.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto pt-8">
        <Link href="/admin/applications" className="group">
          <Card className="h-full hover:shadow-lg transition-shadow border-2 border-transparent hover:border-blue-500">
            <CardHeader className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-blue-100 rounded-lg">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl">
                CalAIM <br />Application Portal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                View, manage, and process all incoming CalAIM applications from members and referrers.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/application-statistics" className="group">
          <Card className="h-full hover:shadow-lg transition-shadow border-2 border-transparent hover:border-purple-500">
            <CardHeader className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-purple-100 rounded-lg">
                <BarChart className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-xl">
                Application<br />Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                View graphical statistics and breakdowns of all applications.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
