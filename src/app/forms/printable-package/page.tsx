
'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Printer, FileText, Info, FileQuestion } from 'lucide-react';

const printableForms = [
  {
    title: 'Full Application Package',
    description: 'A single PDF containing all necessary forms and program information. Recommended for most users.',
    href: '/forms/printable-package/full-package',
    icon: FileText,
  },
  {
    title: 'CS Member Summary Form',
    description: 'The core application form for gathering member information.',
    href: '/forms/cs-summary-form/printable',
    icon: FileText,
  },
  {
    title: 'Waivers & Authorizations',
    description: 'HIPAA, Liability, and Freedom of Choice waivers.',
    href: '/forms/waivers/printable',
    icon: FileText,
  },
  {
    title: 'Declaration of Eligibility',
    description: 'Required only for the SNF Diversion pathway.',
    href: '/forms/declaration-of-eligibility/printable',
    icon: FileText,
  },
   {
    title: 'Acronym Glossary',
    description: 'A helpful list of common acronyms used in the application.',
    href: '/forms/acronym-glossary/printable',
    icon: FileQuestion,
  },
  {
    title: 'Program Information Sheet',
    description: 'An overview of the CalAIM Community Supports program.',
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
          <h1 className="text-3xl font-bold tracking-tight">Printable Forms</h1>
          <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
            Access printable versions of all application forms and informational documents. You can print the full package or individual forms as needed.
          </p>
        </div>

        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          {printableForms.map((form) => {
            const Icon = form.icon;
            return (
              <Card key={form.title} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <CardTitle className="text-xl">{form.title}</CardTitle>
                     <div className="p-2 bg-muted rounded-md">
                        <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <CardDescription>{form.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex items-end">
                   <Button asChild className="w-full">
                    <Link href={form.href} target="_blank" rel="noopener noreferrer">
                      <Printer className="mr-2 h-4 w-4" />
                      Print Form
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </main>
    </>
  );
}
