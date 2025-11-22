'use client';

import React from 'react';
import {
  FileText,
  HelpCircle,
  Users,
  Building,
  HeartHandshake,
  KeyRound,
  Home,
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
              The Connections Care Home Consultants application portal for the California Advancing and Innovating Medi-Cal (CalAIM) Community Support for Assisted Transitions (SNF Diversion/Transition) for Health Net and Kaiser.
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
                <CardTitle>What is the California Assisted Living and Innovating Medi-Cal (CalAIM) Program?</CardTitle>
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
              </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                    <HeartHandshake className="h-8 w-8 text-primary" />
                    <CardTitle>The Role of Connections Care Home Consultants</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-base max-w-none">
                    <p>Connections is a CS Provider that assists with understanding the program, finding participating facilities, coordinating paperwork and assessments, and liaising with your Managed Care Plan to request authorization for the CS. Once a member is placed, we also send a MSW to visit the member at the RCFE/ARF for monthly quality control checks and provide ongoing care coordination.</p>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                    <Building className="h-8 w-8 text-primary" />
                    <CardTitle>Managed Care Plans We Work With</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-base max-w-none">
                     <ul className="list-disc pl-5">
                        <li><strong>Health Net:</strong> Serving members in Sacramento and Los Ángeles counties.</li>
                        <li><strong>Kaiser Permanente:</strong> Serving members in various counties throughout California.</li>
                    </ul>
                    <p>You must be a member of one of these plans to utilize our services for the CalAIM Community Support for Assisted Living Transitions.</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                    <Home className="h-8 w-8 text-primary" />
                    <CardTitle>Types of Assisted Living (RCFEs/ARFs)</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-base max-w-none">
                     <p>Assisted living facilities in California (also known as residential care facilities for the elderly - RCFEs) come in various sizes, each offering a different environment. Connections can help you find a setting that best suits your needs:</p>
                    <ul className="list-disc pl-5">
                        <li><strong>Small, Home-Like Settings:</strong> These are typically 4-6 bed homes that provide a high staff-to-resident ratio. This environment offers more personalized attention and a quieter, more intimate living experience.</li>
                        <li><strong>Large, Community Settings:</strong> These are often 100+ bed facilities that feature amenities like group dining rooms, a wide variety of planned activities, and social opportunities. Staff is available as needed to provide care and support.</li>
                    </ul>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                    <KeyRound className="h-8 w-8 text-primary" />
                    <CardTitle>ARF vs. RCFE: What's the Difference?</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-base max-w-none">
                    <p>In California, the key difference between an Adult Residential Facility (ARF) and a Residential Care Facility for the Elderly (RCFE) is the age of the residents they serve. ARFs provide non-medical care and supervision to adults aged 18 to 59, often with disabilities or other conditions. RCFEs, on the other hand, are specifically for individuals 60 years and older who need assistance with daily living activities.</p>
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
