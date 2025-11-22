'use client';

import React from 'react';
import {
  DollarSign,
  FileText,
  CheckCircle,
  HelpCircle,
  Users,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { GlossaryDialog } from '@/components/GlossaryDialog';
import { PrintableProgramInfo } from './components/PrintableProgramInfo';

export default function ProgramInfoPage() {

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50 print:bg-white">
      <Header />
      <main className="flex-grow flex items-center justify-center py-8 px-4 sm:px-6">
        <div className="w-full max-w-4xl mx-auto">
          {/* Header for online view */}
          <div className="mb-8 text-center print:hidden">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Program Information</h1>
            <p className="mt-2 text-md sm:text-lg text-muted-foreground max-w-3xl mx-auto">
              A comprehensive guide to the CalAIM Community Support for Assisted Transitions.
            </p>
          </div>

          <div className="flex justify-end mb-4 print:hidden">
            <GlossaryDialog />
          </div>

          {/* Card-based content for online view */}
          <div className="space-y-6 print:hidden">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <HelpCircle className="h-8 w-8 text-primary" />
                <CardTitle>What is the CalAIM Program?</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-base max-w-none">
                 <p>CalAIM is California's long-term initiative to transform the Medi-Cal program by improving quality outcomes, reducing health disparities, and creating a more seamless and consistent system. It aims to achieve this through a focus on "whole person care," which includes addressing social determinants of health, integrating physical, mental, and social services, and launching new programs like Enhanced Care Management (ECM) and Community Supports. Community Supports (CS) are administered through managed care plans (MCPs).</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Users className="h-8 w-8 text-primary" />
                <CardTitle>Community Supports for Assisted Living Transitions</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-base max-w-none">
                <p>There are 14 Community Supports (CS) and Assisted Living Transitions is one of them. This CS gives eligible members the choice to reside in an assisted living setting—such as a Residential Care Facility for the Elderly (RCFE) or an Adult Residential Facility (ARF)—as a safe alternative to a skilled nursing facility, promoting greater independence and community integration.</p>
                <h3 className="font-semibold text-lg mt-4">The Role of Connections Care Home Consultants</h3>
                <p>Connections is a CS Provider that assists with understanding the program, finding participating facilities, coordinating paperwork and assessments, and liaising with your Managed Care Plan to request authorization for the CS. Once a member is placed, we also send a MSW to visit the member at the RCFE/ARF for monthly quality control checks and provide ongoing care coordination.</p>
              </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                    <DollarSign className="h-8 w-8 text-primary" />
                    <CardTitle>Financial & Health Plan Information</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-base max-w-none">
                    <p><strong>Medicare vs. Medi-Cal:</strong> Medicare is a federal health insurance program primarily for people aged 65 or older and some younger people with disabilities. Medi-Cal is a state and federal program providing health coverage to low-income individuals. CalAIM is a Medi-Cal program.</p>
                    <p><strong>"Room and Board" Payments:</strong> The member pays a "Room and Board" portion, usually dependent on their social security income. The amount can vary. For members with lower income, a supplement may be available.</p>
                    <p><strong>Medi-Cal Share of Cost (SOC):</strong> CalAIM participants are not allowed to have a Medi-Cal SOC. A SOC is like a deductible that must be paid before Medi-Cal covers costs. If you have a SOC, it must be eliminated to join the program.</p>
                    <p><strong>Switching Health Plans:</strong> To enroll in CalAIM through Connections, you must be a member of Health Net or Kaiser. You can change your health plan by contacting California Health Care Options.</p>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                    <CheckCircle className="h-8 w-8 text-primary" />
                    <CardTitle>Eligibility & Application Process</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-base max-w-none">
                     <h3 className="font-semibold text-lg">SNF Transition Pathway</h3>
                    <p>For members moving from a Skilled Nursing Facility (SNF) to an assisted living community. Requires a continuous stay of 60 days in a hospital or SNF.</p>

                    <h3 className="font-semibold text-lg mt-4">SNF Diversion Pathway</h3>
                    <p>For members at risk of SNF admission who can be safely cared for in the community. This includes members transferring from home or a hospital.</p>

                    <h3 className="font-semibold text-lg mt-4">Individual Service Plan (ISP)</h3>
                    <p>As part of the application, Connections will conduct an in-person or virtual assessment to determine the level of care needed, which sets the payment rate for the assisted living facility.</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                    <FileText className="h-8 w-8 text-primary" />
                    <CardTitle>What Comes Next?</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-base max-w-none">
                     <p>The CS Member Summary Form is the next step to gather the information we need to process your application. After you complete this form, the application will guide you through any other required documents based on your selected pathway and health plan.</p>
                </CardContent>
            </Card>

          </div>

          {/* Content for print view */}
          <div className="hidden print:block">
            <PrintableProgramInfo />
          </div>
        </div>
      </main>
    </div>
  );
}
