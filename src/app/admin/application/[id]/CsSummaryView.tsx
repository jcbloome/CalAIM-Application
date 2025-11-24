

'use client';

import type { Application } from '@/lib/definitions';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { Timestamp } from 'firebase/firestore';

const Field = ({ label, value }: { label: string; value: any }) => (
    <div>
        <h4 className="text-sm font-medium text-muted-foreground">{label}</h4>
        <p className="text-base font-semibold">{value || <span className="text-gray-400 font-normal">N/A</span>}</p>
    </div>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2 mb-4">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            {children}
        </div>
    </div>
);

const formatDate = (date: any) => {
    if (!date) return 'N/A';
    if (date instanceof Timestamp) {
        return format(date.toDate(), 'PPP');
    }
    if (date instanceof Date) {
        return format(date, 'PPP');
    }
    if (typeof date === 'string') {
        const parsedDate = new Date(date);
        if (!isNaN(parsedDate.getTime())) {
            return format(parsedDate, 'PPP');
        }
    }
    return 'Invalid Date';
};

export function CsSummaryView({ application }: { application: Partial<Application> & { [key: string]: any } }) {
  if (!application) {
    return <div>Loading application data...</div>;
  }
  
  const data = application;
  const dobFormatted = formatDate(data.memberDob);

  return (
    <ScrollArea className="h-[75vh] pr-6">
        <div className="space-y-8">
            <Section title="Member Information">
                <Field label="First Name" value={data.memberFirstName} />
                <Field label="Last Name" value={data.memberLastName} />
                <Field label="Date of Birth" value={dobFormatted} />
                <Field label="Age" value={data.memberAge} />
                <Field label="Medi-Cal Number" value={data.memberMediCalNum} />
                <Field label="Medical Record Number (MRN)" value={data.memberMrn} />
                <Field label="Preferred Language" value={data.memberLanguage} />
                <Field label="County" value={data.memberCounty} />
            </Section>

            <Section title="Referrer Information">
                <Field label="First Name" value={data.referrerFirstName} />
                <Field label="Last Name" value={data.referrerLastName} />
                <Field label="Email" value={data.referrerEmail} />
                <Field label="Phone" value={data.referrerPhone} />
                <Field label="Relationship to Member" value={data.referrerRelationship} />
                <Field label="Agency" value={data.agency} />
            </Section>
            
            <Section title="Primary Contact">
                <Field label="Contact Type" value={data.bestContactType} />
                <Field label="First Name" value={data.bestContactFirstName} />
                <Field label="Last Name" value={data.bestContactLastName} />
                <Field label="Relationship" value={data.bestContactRelationship} />
                <Field label="Phone" value={data.bestContactPhone} />
                <Field label="Email" value={data.bestContactEmail} />
                <Field label="Language" value={data.bestContactLanguage} />
            </Section>
            
            <Section title="Secondary Contact">
                <Field label="First Name" value={data.secondaryContactFirstName} />
                <Field label="Last Name" value={data.secondaryContactLastName} />
                <Field label="Relationship" value={data.secondaryContactRelationship} />
                <Field label="Phone" value={data.secondaryContactPhone} />
                <Field label="Email" value={data.secondaryContactEmail} />
                <Field label="Language" value={data.secondaryContactLanguage} />
            </Section>

            <Section title="Legal Representative">
                <Field label="Has Capacity" value={data.hasCapacity} />
                <Field label="Has Legal Rep" value={data.hasLegalRep} />
                <Field label="Name" value={data.repName} />
                <Field label="Relationship" value={data.repRelationship} />
                <Field label="Phone" value={data.repPhone} />
                <Field label="Email" value={data.repEmail} />
            </Section>

            <Section title="Location Information">
                <Field label="Current Location" value={data.currentLocation} />
                <Field label="Current Address" value={`${data.currentAddress || ''}, ${data.currentCity || ''}, ${data.currentState || ''} ${data.currentZip || ''}`.replace(/, , /g, ', ').replace(/^, |, $/g, '')} />
                <Field label="Current County" value={data.currentCounty} />
                <Field label="Customary Address" value={data.copyAddress ? 'Same as current' : `${data.customaryAddress || ''}, ${data.customaryCity || ''}, ${data.customaryState || ''} ${data.customaryZip || ''}`.replace(/, , /g, ', ').replace(/^, |, $/g, '')} />
                 <Field label="Customary County" value={data.customaryCounty} />
            </Section>

            <Section title="Health Plan & Pathway">
                <Field label="Health Plan" value={data.healthPlan} />
                <Field label="Switching Health Plan?" value={data.switchingHealthPlan} />
                <Field label="Pathway" value={data.pathway} />
                <Field label="Meets Criteria" value={data.meetsPathwayCriteria ? 'Yes' : 'No'} />
                <Field label="SNF Diversion Reason" value={data.snfDiversionReason} />
            </Section>

            <Section title="ISP Contact">
                <Field label="First Name" value={data.ispFirstName} />
                <Field label="Last Name" value={data.ispLastName} />
                <Field label="Relationship" value={data.ispRelationship} />
                <Field label="Facility" value={data.ispFacilityName} />
                <Field label="Phone" value={data.ispPhone} />
                <Field label="Email" value={data.ispEmail} />
                <Field label="ISP Address" value={`${data.ispAddress || ''}, ${data.ispCity || ''}, ${data.ispState || ''} ${data.ispZip || ''}`.replace(/, , /g, ', ').replace(/^, |, $/g, '')} />
                <Field label="ISP County" value={data.ispCounty} />
            </Section>

             <Section title="RCFE & ALW">
                <Field label="On ALW Waitlist" value={data.onALWWaitlist} />
                <Field label="Has Preferred RCFE" value={data.hasPrefRCFE} />
                <Field label="Facility Name" value={data.rcfeName} />
                <Field label="Facility Address" value={data.rcfeAddress} />
                <Field label="Admin Name" value={data.rcfeAdminName} />
                <Field label="Admin Phone" value={data.rcfeAdminPhone} />
                <Field label="Admin Email" value={data.rcfeAdminEmail} />
            </Section>
        </div>
    </ScrollArea>
  );
}
