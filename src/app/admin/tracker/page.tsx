
'use client';

import { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { applications as mockApplications, statsData } from '@/lib/data';
import { CheckCircle2, XCircle, BookOpen, Search } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Application } from '@/lib/definitions';

const allForms = [
    { name: 'CS Member Summary', initial: 'CS' },
    { name: 'Program Information', initial: 'PI' },
    { name: 'HIPAA Authorization', initial: 'HP' },
    { name: 'Liability Waiver', initial: 'LW' },
    { name: 'Freedom of Choice Waiver', initial: 'FC' },
    { name: 'Proof of Income', initial: 'PoI' },
    { name: 'Physician\'s Report', initial: 'PR' },
    { name: 'Declaration of Eligibility', initial: 'DE' },
    { name: 'SNF Facesheet', initial: 'SF' },
    { name: 'Medicine List', initial: 'ML' },
];

function LegendDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <BookOpen className="mr-2 h-4 w-4" />
                    View Legend
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Form Legend</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-72">
                    <div className="p-4">
                        <dl>
                            {allForms.map((item, index) => (
                                <div key={item.name}>
                                    <div className="flex items-baseline gap-4 py-2">
                                        <dt className="w-8 text-center font-bold text-primary">{item.initial}</dt>
                                        <dd className="text-muted-foreground">{item.name}</dd>
                                    </div>
                                    {index < allForms.length - 1 && <Separator />}
                                </div>
                            ))}
                        </dl>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}


export default function TrackerPage() {
    const [nameFilter, setNameFilter] = useState('');
    const [pathwayFilter, setPathwayFilter] = useState('all');
    const [healthPlanFilter, setHealthPlanFilter] = useState('all');
    const [missingFormFilter, setMissingFormFilter] = useState('all');

    const filteredApplications = useMemo(() => {
        return mockApplications.filter(app => {
            const nameMatch = app.memberName.toLowerCase().includes(nameFilter.toLowerCase());
            const pathwayMatch = pathwayFilter === 'all' || app.pathway === pathwayFilter;
            const healthPlanMatch = healthPlanFilter === 'all' || app.healthPlan === healthPlanFilter;
            const missingFormMatch = missingFormFilter === 'all' || !app.forms.some(f => f.name === missingFormFilter && f.status === 'Completed');

            return nameMatch && pathwayMatch && healthPlanMatch && missingFormMatch;
        });
    }, [nameFilter, pathwayFilter, healthPlanFilter, missingFormFilter]);


  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-2xl font-bold tracking-tight">Application Tracker</h1>
        <p className="text-muted-foreground">A high-level overview of form completion for all applications.</p>
      </div>

      <Card>
        <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 justify-between sm:items-center">
                 <div>
                    <CardTitle>Completion Grid</CardTitle>
                    <CardDescription>Quickly identify bottlenecks in the application process.</CardDescription>
                </div>
                 <LegendDialog />
            </div>
             <div className="flex flex-wrap gap-2 pt-4">
                <div className="relative flex-grow sm:flex-grow-0">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                        placeholder="Filter by member name..." 
                        className="pl-8 w-full sm:w-[200px]"
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)}
                    />
                </div>
                <Select value={pathwayFilter} onValueChange={setPathwayFilter}>
                    <SelectTrigger className="flex-grow sm:w-[180px]">
                        <SelectValue placeholder="Filter by pathway" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Pathways</SelectItem>
                        <SelectItem value="SNF Transition">SNF Transition</SelectItem>
                        <SelectItem value="SNF Diversion">SNF Diversion</SelectItem>
                    </SelectContent>
                </Select>
                 <Select value={healthPlanFilter} onValueChange={setHealthPlanFilter}>
                    <SelectTrigger className="flex-grow sm:w-[180px]">
                        <SelectValue placeholder="Filter by health plan" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Health Plans</SelectItem>
                        <SelectItem value="Kaiser Permanente">Kaiser Permanente</SelectItem>
                        <SelectItem value="Health Net">Health Net</SelectItem>
                    </SelectContent>
                </Select>
                 <Select value={missingFormFilter} onValueChange={setMissingFormFilter}>
                    <SelectTrigger className="flex-grow sm:w-[220px]">
                        <SelectValue placeholder="Filter by missing form" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Applications</SelectItem>
                        {allForms.map(form => (
                            <SelectItem key={form.name} value={form.name}>Missing: {form.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </CardHeader>
        <CardContent>
          <TooltipProvider>
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[150px] font-bold">Member Name</TableHead>
                    {allForms.map(form => (
                        <TableHead key={form.name} className="text-center w-[60px]">
                             <Tooltip>
                                <TooltipTrigger>
                                    <span className="font-bold">{form.initial}</span>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{form.name}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TableHead>
                    ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredApplications.map(app => (
                        <TableRow key={app.id}>
                            <TableCell className="font-medium">{app.memberName}</TableCell>
                            {allForms.map(form => {
                                const formStatus = app.forms.find(f => f.name === form.name)?.status;
                                const isCompleted = formStatus === 'Completed';

                                return (
                                    <TableCell key={form.name} className="text-center">
                                         <Tooltip>
                                            <TooltipTrigger>
                                                {isCompleted ? (
                                                    <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                                                ) : (
                                                    <XCircle className="h-5 w-5 text-red-500 mx-auto opacity-50" />
                                                )}
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{isCompleted ? 'Completed' : 'Pending'}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    ))}
                     {filteredApplications.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={allForms.length + 1} className="h-24 text-center">
                                No applications match the current filters.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
          </TooltipProvider>
        </CardContent>
      </Card>
    </div>
  );
}
