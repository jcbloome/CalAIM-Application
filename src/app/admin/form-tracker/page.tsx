
'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { applications as mockApplications } from '@/lib/data';
import type { Application, FormStatus } from '@/lib/definitions';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CheckCircle2, Circle, FileQuestion } from 'lucide-react';
import Link from 'next/link';

// Get a list of all unique form names across all applications
const allFormNames = Array.from(new Set(mockApplications.flatMap(app => app.forms.map(form => form.name))));

const FormStatusIcon = ({ status }: { status: FormStatus['status'] | undefined }) => {
  if (status === 'Completed') {
    return <CheckCircle2 className="h-5 w-5 text-green-500" />;
  }
  if (status === 'Pending') {
    return <Circle className="h-5 w-5 text-yellow-500" />;
  }
  return <FileQuestion className="h-5 w-5 text-gray-400" />;
};


export default function FormTrackerPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Form Tracker</h1>
        <p className="text-muted-foreground">An at-a-glance overview of form completion for all applications.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Application Form Status</CardTitle>
          <CardDescription>
            Hover over an icon to see the form name. Green means completed, yellow means pending.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TooltipProvider>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member / App ID</TableHead>
                  <TableHead className="text-center">Form Statuses</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockApplications.map(app => {
                  const formStatusMap = new Map(app.forms.map(form => [form.name, form.status]));
                  return (
                    <TableRow key={app.id}>
                      <TableCell>
                        <Link href={`/admin/application/${app.id}`} className="font-medium hover:underline text-primary">
                          {app.memberName}
                        </Link>
                        <div className="text-xs text-muted-foreground font-mono">{app.id}</div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-3">
                          {allFormNames.map(formName => (
                            <Tooltip key={formName}>
                              <TooltipTrigger>
                                <FormStatusIcon status={formStatusMap.get(formName)} />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{formName}</p>
                              </TooltipContent>
                            </Tooltip>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TooltipProvider>
        </CardContent>
      </Card>
    </div>
  );
}
