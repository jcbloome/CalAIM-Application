
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
import type { FormStatus } from '@/lib/definitions';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CheckCircle2, Circle, FileQuestion } from 'lucide-react';
import Link from 'next/link';

// Get a list of all unique form names across all applications
const allFormNames = Array.from(new Set(mockApplications.flatMap(app => app.forms.map(form => form.name))));

// Add any other forms that might not be in the initial mock data but should have a column
const additionalForms = ['SNF Facesheet', 'Proof of Income', "LIC 602A - Physician's Report", "Medicine List"];
additionalForms.forEach(formName => {
    if (!allFormNames.includes(formName)) {
        allFormNames.push(formName);
    }
});


const formInitialsMap: Record<string, string> = {
    'CS Member Summary': 'CS',
    'Program Information': 'PI',
    'HIPAA Authorization': 'HP',
    'Liability Waiver': 'LW',
    'Freedom of Choice Waiver': 'FC',
    'Declaration of Eligibility': 'DE',
    'Proof of Income': 'POI',
    "LIC 602A - Physician's Report": 'PR',
    "Medicine List": 'ML',
    'SNF Facesheet': 'SF',
};

// Filter the map to only include forms that actually exist in our data + logic
const legendItems = allFormNames.map(name => ({
    initial: formInitialsMap[name] || name.substring(0, 2).toUpperCase(),
    fullName: name
}));


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
            A compact view of form statuses. Green means completed, yellow means pending.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="p-4 border rounded-lg bg-muted/50 mb-6">
                <h3 className="font-semibold mb-2">Legend</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-1 text-sm">
                    {legendItems.map(item => (
                        <p key={item.initial}><span className="font-bold text-primary">{item.initial}</span>: {item.fullName}</p>
                    ))}
                </div>
            </div>
          <TooltipProvider>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Member / App ID</TableHead>
                  {legendItems.map(item => (
                     <TableHead key={item.initial} className="text-center">
                        <Tooltip>
                            <TooltipTrigger>{item.initial}</TooltipTrigger>
                            <TooltipContent><p>{item.fullName}</p></TooltipContent>
                        </Tooltip>
                     </TableHead>
                  ))}
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
                       {legendItems.map(item => (
                            <TableCell key={item.initial} className="text-center">
                                <FormStatusIcon status={formStatusMap.get(item.fullName)} />
                            </TableCell>
                        ))}
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
