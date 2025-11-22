'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Trash2, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { applications as mockApplications } from '@/lib/data';
import type { Application, ApplicationStatus } from '@/lib/definitions';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Header } from '@/components/Header';

const getBadgeVariant = (status: ApplicationStatus) => {
  switch (status) {
    case 'Approved':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'Completed & Submitted':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Requires Revision':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'In Progress':
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const ApplicationsTable = ({
  title,
  applications,
  onSelectionChange,
  selection,
}: {
  title: string;
  applications: Application[];
  onSelectionChange?: (id: string, isSelected: boolean) => void;
  selection?: string[];
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {onSelectionChange && <TableHead className="w-[50px]"></TableHead>}
              <TableHead>Member Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map(app => (
              <TableRow key={app.id}>
                {onSelectionChange && (
                  <TableCell>
                    <Checkbox
                      checked={selection?.includes(app.id)}
                      onCheckedChange={checked => onSelectionChange(app.id, !!checked)}
                      aria-label={`Select application for ${app.memberName}`}
                    />
                  </TableCell>
                )}
                <TableCell className="font-medium">{app.memberName}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getBadgeVariant(app.status)}>
                    {app.status}
                  </Badge>
                </TableCell>
                <TableCell>{app.lastUpdated}</TableCell>
                <TableCell className="text-right">
                  {app.status === 'In Progress' || app.status === 'Requires Revision' ? (
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/pathway?applicationId=${app.id}`}>Continue</Link>
                    </Button>
                  ) : (
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/pathway?applicationId=${app.id}`}>View</Link>
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {applications.length === 0 && (
          <div className="text-center p-8 text-muted-foreground">No applications found.</div>
        )}
      </CardContent>
    </Card>
  );
};

export default function MyApplicationsPage() {
  const [applications, setApplications] = useState(mockApplications);
  const [selected, setSelected] = useState<string[]>([]);

  const inProgressApps = applications.filter(
    app => app.status === 'In Progress' || app.status === 'Requires Revision'
  );
  const completedApps = applications.filter(
    app => app.status === 'Completed & Submitted' || app.status === 'Approved'
  );

  const handleSelectionChange = (id: string, isSelected: boolean) => {
    setSelected(prev =>
      isSelected ? [...prev, id] : prev.filter(item => item !== id)
    );
  };
  
  const handleDelete = () => {
    setApplications(apps => apps.filter(app => !selected.includes(app.id)));
    setSelected([]);
  }

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">My Applications</h1>
          <div className="flex items-center gap-2">
            {selected.length > 0 && (
              <Button variant="destructive" onClick={handleDelete}>
                <Trash2 className="mr-2 h-4 w-4" /> Delete ({selected.length})
              </Button>
            )}
            <Button asChild>
              <Link href="/forms/cs-summary-form">
                <Plus className="mr-2 h-4 w-4" /> Start New Application
              </Link>
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          <ApplicationsTable
            title="In Progress Applications"
            applications={inProgressApps}
            onSelectionChange={handleSelectionChange}
            selection={selected}
          />
          <ApplicationsTable
            title="Completed & Submitted Applications"
            applications={completedApps}
          />
        </div>
      </main>
    </>
  );
}
