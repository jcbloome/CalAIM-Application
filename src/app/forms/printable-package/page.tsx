
'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Printer, FileText, Info, FileQuestion, UploadCloud, FileSymlink, Package, AlertCircle } from 'lucide-react';

const bundledForms = [
  {
    title: 'Full Application Package',
    description: 'A single PDF containing all necessary forms and program information. Recommended for most users.',
    href: '/forms/printable-package/full-package',
  },
];

const individualForms = [
  {
    title: 'CS Member Summary Form',
    href: '/forms/cs-summary-form/printable',
    icon: FileText,
  },
  {
    title: 'Waivers & Authorizations',
    href: '/forms/waivers/printable',
    icon: FileText,
  },
  {
    title: 'Declaration of Eligibility',
    href: '/forms/declaration-of-eligibility/printable',
    icon: FileText,
  },
   {
    title: 'Acronym Glossary',
    href: '/forms/acronym-glossary/printable',
    icon: FileQuestion,
  },
  {
    title: 'Program Information Sheet',
    href: '/info/printable',
    icon: Info,
  },
];

export default function PrintablePackagePage() {
  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight">Printable Forms & Resources</h1>
          <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
            Access printable versions of application forms and informational documents. You can also upload completed forms here.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <Card className="border-l-4 border-primary">
                    <CardHeader>
                        <CardTitle>Bundled Packages</CardTitle>
                        <CardDescription>Print a full set of documents at once.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {bundledForms.map((form) => (
                        <Card key={form.title} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4">
                            <div className="flex-1 mb-4 sm:mb-0">
                                <div className="flex items-center gap-3">
                                     <div className="p-2 bg-muted rounded-md hidden sm:block">
                                        <Package className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{form.title}</h3>
                                        <p className="text-sm text-muted-foreground">{form.description}</p>
                                    </div>
                                </div>
                            </div>
                             <Button asChild className="w-full sm:w-auto">
                                <Link href={form.href} target="_blank" rel="noopener noreferrer">
                                <Printer className="mr-2 h-4 w-4" />
                                Print Package
                                </Link>
                            </Button>
                        </Card>
                        ))}
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>Individual Forms</CardTitle>
                        <CardDescription>Print specific forms as needed.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {individualForms.map((form) => {
                            const Icon = form.icon;
                            return (
                                <Link key={form.title} href={form.href} target="_blank" rel="noopener noreferrer" className="block p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                     <div className="flex items-center gap-4">
                                        <Icon className="h-5 w-5 text-muted-foreground" />
                                        <span className="font-medium text-sm">{form.title}</span>
                                    </div>
                                </Link>
                            )
                        })}
                    </CardContent>
                </Card>

            </div>

             <div className="lg:col-span-1 space-y-6">
                <Card className="bg-blue-50 border-blue-200">
                    <CardHeader className="flex-row items-center gap-4">
                         <AlertCircle className="h-8 w-8 text-blue-700" />
                        <CardTitle className="text-blue-900">Online Application is Preferred</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription className="text-blue-800">
                           For the fastest and most secure experience, we strongly recommend completing the application through our online portal. This ensures your data is saved as you go and allows for real-time status updates.
                        </CardDescription>
                         <Button asChild className="w-full mt-4" variant="secondary">
                            <Link href="/applications">Go to My Applications</Link>
                        </Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Secure Upload Portal</CardTitle>
                        <CardDescription>If you've completed a printable form, you must upload it to an application.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">Go to an existing application's pathway page to upload your signed and completed documents.</p>
                         <Button asChild className="w-full">
                            <Link href="/applications">
                                <UploadCloud className="mr-2 h-4 w-4" />
                                Select Application to Upload
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
             </div>

        </div>

      </main>
    </>
  );
}
