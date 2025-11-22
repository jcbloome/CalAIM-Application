'use client';

import React from 'react';
import { Info, Heart, Users, DollarSign, FileText, CheckCircle, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { GlossaryDialog } from '@/components/GlossaryDialog';
import { ProgramInformationContent } from './components/ProgramInformationContent';

const sections = [
    {
      icon: HelpCircle,
      title: 'What is the California Assisted Living and Innovating Medi-Cal (CalAIM) Program?',
      content: <p>CalAIM is California's long-term initiative to transform the Medi-Cal program by improving quality outcomes, reducing health disparities, and creating a more seamless and consistent system. It aims to achieve this through a focus on "whole person care," which includes addressing social determinants of health, integrating physical, mental, and social services, and launching new programs like Enhanced Care Management (ECM) and Community Supports. Community Supports (CS) are administered through managed care plans (MCPs).</p>
    },
    {
      icon: Info,
      title: 'Community Supports for Assisted Living Transitions',
      content: <p>There are 14 Community Supports (CS) and Assisted Living Transitions is one of them. This CS gives eligible members the choice to reside in an assisted living setting—such as a Residential Care Facility for the Elderly (RCFE) or an Adult Residential Facility (ARF)—as a safe alternative to a skilled nursing facility, promoting greater independence and community integration.</p>
    },
    {
      icon: Heart,
      title: 'The Role of Connections Care Home Consultants',
      content: <p>Connections is a CS Provider that assists with understanding the program, finding participating facilities, coordinating paperwork and assessments, and liaising with your Managed Care Plan to request authorization for the CS. Once a member is placed, we also send a MSW to visit the member at the RCFE/ARF for monthly quality control checks and provide ongoing care coordination.</p>
    },
];

const SectionCard = ({ icon: Icon, title, children }: { icon: React.ElementType, title: string, children: React.ReactNode }) => (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center gap-4">
            <Icon className="h-8 w-8 text-primary" />
            <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
    </Card>
);


export default function ProgramInfoPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 print:bg-white">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
          
          {/* Header for online view */}
          <div className="mb-10 print:hidden">
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Program Information</h1>
              <p className="mt-2 text-lg text-muted-foreground max-w-3xl">
                The Connections Care Home Consultants application portal for the California Advancing and Innovating Medi-Cal (CalAIM) Community Support for Assisted Transitions (SNF Diversion/Transition) for Health Net and Kaiser.
              </p>
              <div className="mt-4">
                <GlossaryDialog />
              </div>
          </div>
          
          {/* Content for online view */}
          <div className="space-y-6 print:hidden">
              {sections.map((section) => (
                  <SectionCard key={section.title} icon={section.icon} title={section.title}>
                      {section.content}
                  </SectionCard>
              ))}
          </div>

          {/* Content for print view */}
          <div className="hidden print:block">
            <ProgramInformationContent />
          </div>

        </div>
      </main>
    </div>
  );
}
