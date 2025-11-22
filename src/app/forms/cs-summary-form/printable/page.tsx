
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Printer, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const Field = ({ label, className = '' }: { label: string; className?: string }) => (
  <div className={`pt-4 ${className}`}>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="mt-1 h-6 border-b border-gray-400"></div>
  </div>
);

const CheckboxField = ({ label }: { label: string }) => (
    <div className="flex items-center mt-4">
        <div className="h-5 w-5 border border-gray-400 rounded-sm"></div>
        <label className="ml-3 text-sm text-gray-700">{label}</label>
    </div>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4 mt-8">{children}</h2>
);

function PrintableCsSummaryFormContent() {
  return (
    <form>
            <div className="space-y-8">
              <div>
                <SectionTitle>Member Information</SectionTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                  <Field label="First Name" />
                  <Field label="Last Name" />
                  <Field label="Date of Birth (MM/DD/YYYY)" />
                  <Field label="Age" />
                  <Field label="Medi-Cal Number (Health Net) or Medical Record Number (Kaiser)" />
                  <Field label="Confirm Number" />
                  <Field label="Medical Record Number (MRN)" />
                  <Field label="Confirm Medical Record Number" />
                  <Field label="Preferred Language" />
                </div>
              </div>

              <div>
                <SectionTitle>Your Information (Person Filling Out Form)</SectionTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                  <Field label="First Name" />
                  <Field label="Last Name" />
                  <Field label="Your Phone" />
                  <Field label="Your Email" />
                  <Field label="Relationship to Member (e.g., Family Member, Social Worker)" className="sm:col-span-2" />
                </div>
              </div>

              <div>
                <SectionTitle>Member Contact Information</SectionTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                  <Field label="Member Phone" />
                  <Field label="Member Email" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mt-6">Best Contact Person (if not member)</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mt-2">
                    <Field label="Name" />
                    <Field label="Relationship to Member" />
                    <Field label="Phone" />
                    <Field label="Email" />
                    <Field label="Preferred Language" />
                 </div>
              </div>

              <div>
                <SectionTitle>Legal Representative</SectionTitle>
                 <div className="space-y-4">
                    <p className="text-sm font-medium text-gray-700">Does member have capacity to make their own decisions?</p>
                    <div className="flex gap-8">
                        <CheckboxField label="Yes" />
                        <CheckboxField label="No" />
                        <CheckboxField label="Unknown" />
                    </div>
                 </div>
                 <div className="space-y-4 mt-6">
                    <p className="text-sm font-medium text-gray-700">Does member have a legal representative? (e.g., power of attorney)</p>
                    <div className="flex gap-8">
                        <CheckboxField label="Yes" />
                        <CheckboxField label="No" />
                    </div>
                 </div>
                 <h3 className="text-lg font-medium text-gray-800 mt-6">Representative's Contact Info</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mt-2">
                    <Field label="Name" />
                    <Field label="Relationship to Member" />
                    <Field label="Phone" />
                    <Field label="Email" />
                    <Field label="Preferred Language" />
                 </div>
              </div>

              <div>
                <SectionTitle>Location Information</SectionTitle>
                <Field label="Member's Current Location (SNF, Hospital, Home, etc.)" className="sm:col-span-2" />
                <h3 className="text-lg font-medium text-gray-800 mt-6">Current Address</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mt-2">
                    <Field label="Street Address" className="sm:col-span-2"/>
                    <Field label="City" />
                    <Field label="State" />
                    <Field label="ZIP Code" />
                 </div>
                <CheckboxField label="Customary residence is the same as current location." />
                <h3 className="text-lg font-medium text-gray-800 mt-6">Customary Residence (if different)</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mt-2">
                    <Field label="Street Address" className="sm:col-span-2"/>
                    <Field label="City" />
                    <Field label="State" />
                    <Field label="ZIP Code" />
                 </div>
              </div>

              <div>
                <SectionTitle>Health Plan & Pathway</SectionTitle>
                 <div className="space-y-4 mt-6">
                    <p className="text-sm font-medium text-gray-700">Health Plan (Managed Care Plan)</p>
                    <div className="flex gap-8">
                        <CheckboxField label="Kaiser Permanente" />
                        <CheckboxField label="Health Net" />
                        <CheckboxField label="Other" />
                    </div>
                 </div>
                <p className="text-sm font-medium text-gray-700 mt-6">Pathway Selection</p>
                 <div className="flex gap-8">
                    <CheckboxField label="SNF Transition" />
                    <CheckboxField label="SNF Diversion" />
                </div>
                
                <div className="mt-6 space-y-4">
                    <h3 className="text-lg font-medium text-gray-800">SNF Transition Eligibility Requirements</h3>
                    <p className="text-sm text-gray-600">Enables a current SNF resident to transfer to a RCFE or ARF.</p>
                    <ul className="list-decimal pl-6 space-y-2 text-sm text-gray-700">
                        <li>Has resided in a SNF for at least 60 consecutive days (which can include a combination of Medicare and Medi-Cal days and back and forth from SNF-hospital-SNF); and</li>
                        <li>Is willing to live in RCFE as an alternative to a SNF; and</li>
                        <li>Is able to safely reside in RCFE with appropriate and cost-effective supports and services.</li>
                    </ul>
                    <CheckboxField label="All criteria for SNF Transition have been met." />
                </div>

                <div className="mt-6 space-y-4">
                    <h3 className="text-lg font-medium text-gray-800">SNF Diversion Eligibility Requirements</h3>
                    <p className="text-sm text-gray-600">Transition a member who, without this support, would need to reside in a SNF and instead transitions him/her to RCFE or ARF.</p>
                     <ul className="list-decimal pl-6 space-y-2 text-sm text-gray-700">
                        <li>Interested in remaining in the community; and</li>
                        <li>Is able to safely reside in RCFE with appropriate and cost-effective supports and services; and</li>
                        <li>Must be currently at medically necessary SNF level of care: e.g., require substantial help with activities of daily living (help with dressing, bathing, incontinence, etc.) or at risk of premature institutionalization; and meet the criteria to receive those services in RCFE or ARF.</li>
                    </ul>
                    <CheckboxField label="All criteria for SNF Diversion have been met." />
                    <Field label="Reason for SNF Diversion" className="sm:col-span-2" />
                </div>
              </div>

              <div>
                <SectionTitle>ISP & Facility Information</SectionTitle>
                 <h3 className="text-lg font-medium text-gray-800 mt-6">Individual Service Plan (ISP) Contact</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mt-2">
                    <Field label="First Name" />
                    <Field label="Last Name" />
                    <Field label="Relationship to Member" />
                    <Field label="Facility Name" />
                    <Field label="Phone" />
                    <Field label="Email" />
                 </div>
                 
                 <h3 className="text-lg font-medium text-gray-800 mt-6">ISP Assessment Location</h3>
                 <div className="space-y-2 mt-2">
                    <CheckboxField label="ISP contact location is same as member's current location" />
                    <CheckboxField label="ISP contact location is same as member's customary residence" />
                 </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mt-2">
                    <Field label="Address" className="sm:col-span-2"/>
                    <Field label="City" />
                    <Field label="State" />
                    <Field label="Zip Code" />
                    <Field label="County" />
                 </div>

                <h3 className="text-lg font-medium text-gray-800 mt-6">Assisted Living Waiver (ALW) Status</h3>
                <p className="text-sm text-gray-700 mt-2">Is the member currently on the ALW waitlist?</p>
                <div className="flex gap-8">
                    <CheckboxField label="Yes" />
                    <CheckboxField label="No" />
                    <CheckboxField label="Unknown" />
                </div>

                <h3 className="text-lg font-medium text-gray-800 mt-6">RCFE Selection</h3>
                <div className="space-y-4 mt-6">
                    <p className="text-sm font-medium text-gray-700">Has a preferred assisted living facility (RCFE) been chosen?</p>
                    <div className="flex gap-8">
                        <CheckboxField label="Yes" />
                        <CheckboxField label="No" />
                    </div>
                </div>
                <h4 className="text-md font-medium text-gray-800 mt-6">Preferred Facility Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mt-2">
                    <Field label="Facility Name" className="sm:col-span-2"/>
                    <Field label="Facility Address" className="sm:col-span-2"/>
                    <Field label="Administrator Name" />
                    <Field label="Administrator Phone" />
                    <Field label="Administrator Email" />
                </div>
              </div>
            </div>
          </form>
  )
}

export default function PrintableCsSummaryForm() {

  const handlePrint = () => {
    window.print();
  };
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto py-8 px-4 print:p-0">
        <div className="bg-white p-8 shadow-lg rounded-lg print:shadow-none print:p-0">
          <div className="flex justify-between items-start mb-8 print:hidden">
            <Button variant="outline" asChild>
                <Link href="/forms/printable-package">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Return to Printable Forms
                </Link>
            </Button>
            <Button onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />
              Print Form
            </Button>
          </div>
          
           <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-gray-800 tracking-tight">CS Member Summary</h1>
                <p className="mt-2 text-md text-gray-500 max-w-2xl mx-auto">This form gathers essential information about the member to determine eligibility for the CalAIM Community Supports program.</p>
            </div>

          <PrintableCsSummaryFormContent />
        </div>
      </div>
    </div>
  );
}
