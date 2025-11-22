'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { ProgramInformationContent } from './components/ProgramInformationContent';

export default function ProgramInfoPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8 print:hidden">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Program Information</h1>
                <p className="text-muted-foreground mt-1">Please carefully review the following information about the CalAIM program.</p>
            </div>
            <div className='flex gap-2'>
                <Button onClick={handlePrint} variant="outline">
                    <Printer className="mr-2 h-4 w-4" />
                    Print Information
                </Button>
                <Button asChild>
                  <Link href="/applications">
                    Start Application <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
            </div>
          </div>
          
          <div className="bg-white p-8 sm:p-12 shadow-lg rounded-lg print:shadow-none print:p-0 print:bg-white">
            <ProgramInformationContent />
          </div>
        </div>
      </main>
    </div>
  );
}
