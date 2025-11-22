'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Building, DollarSign, HeartHandshake, Hospital, Home, Info, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GlossaryDialog } from '@/components/GlossaryDialog';
import { Header } from '@/components/Header';

const totalPages = 3;

const InfoCard = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
  <Card className="mb-6">
    <CardHeader className="flex flex-row items-center gap-4">
      {icon}
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent className="prose prose-sm max-w-none text-muted-foreground">
      {children}
    </CardContent>
  </Card>
);

export default function ProgramInfoPage() {
  const [page, setPage] = useState(1);

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">About the Program</h1>
          <p className="text-muted-foreground mb-6">Learn about CalAIM Community Supports before you start.</p>
          
          <div className="relative">
            {page === 1 && (
              <div>
                <InfoCard icon={<Info className="h-6 w-6 text-primary" />} title="Purpose of CalAIM">
                  <p>CalAIM Community Supports provide persons in need with access to assisted living facilities as an alternative to long-term care placement. This allows members to live in the least restrictive environment.</p>
                </InfoCard>
                <InfoCard icon={<HeartHandshake className="h-6 w-6 text-primary" />} title="Role of Connections">
                  <p>Connections acts as a bridge, helping to find appropriate assisted living facilities, securing funding, and coordinating with health plans to ensure a smooth transition for members.</p>
                </InfoCard>
                <InfoCard icon={<Building className="h-6 w-6 text-primary" />} title="Types of Assisted Living">
                  <p>We work with Residential Care Facilities for the Elderly (RCFEs). These are licensed facilities that provide personal care and supervision.</p>
                </InfoCard>
              </div>
            )}

            {page === 2 && (
              <div>
                <InfoCard icon={<DollarSign className="h-6 w-6 text-primary" />} title="Financial Aspects">
                  <ul className="list-disc pl-5">
                    <li><strong>Medicare vs. Medi-Cal:</strong> Medicare does not cover long-term assisted living. This program is funded through Medi-Cal.</li>
                    <li><strong>Share of Cost (SOC):</strong> Members may have a Share of Cost, which is a monthly payment they are responsible for, similar to a co-pay.</li>
                  </ul>
                </InfoCard>
                <InfoCard icon={<ShieldCheck className="h-6 w-6 text-primary" />} title="Important Notes">
                  <ul className="list-disc pl-5">
                    <li>For Health Net members, this benefit is only available for those enrolled in a specific Health Net plan.</li>
                    <li>Kaiser members are also eligible under jejich specific plan structures.</li>
                  </ul>
                </InfoCard>
              </div>
            )}

            {page === 3 && (
              <div>
                <InfoCard icon={<Hospital className="h-6 w-6 text-primary" />} title="Pathway 1: SNF Transition">
                  <p>For members currently in a Skilled Nursing Facility (SNF) who wish to transition to an assisted living environment.</p>
                </InfoCard>
                <InfoCard icon={<Home className="h-6 w-6 text-primary" />} title="Pathway 2: SNF Diversion">
                  <p>For members currently at home or in a hospital who are at risk of being admitted to an SNF, and could be "diverted" to an RCFE instead.</p>
                </InfoCard>
                <InfoCard icon={<Info className="h-6 w-6 text-primary" />} title="After Applying">
                  <p>Once the referral is submitted, the Managed Care Plan (MCP) will review the application. If approved, they will provide an authorization for services.</p>
                </InfoCard>
              </div>
            )}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <GlossaryDialog />
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Page {page} of {totalPages}</span>
              {page < totalPages ? (
                <Button onClick={() => setPage(p => Math.min(totalPages, p + 1))}>
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button asChild>
                  <Link href="/applications">
                    Start Application <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
