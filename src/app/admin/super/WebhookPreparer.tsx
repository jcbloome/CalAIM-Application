
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Timestamp } from 'firebase/firestore';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

const samplePayload = {
    memberFirstName: 'John',
    memberLastName: 'Doe',
    memberDob: Timestamp.fromDate(new Date('1965-01-15')).toDate(),
    memberAge: 59,
    memberMediCalNum: '912345678',
    confirmMemberMediCalNum: '912345678',
    memberMrn: 'MRN123456789',
    confirmMemberMrn: 'MRN123456789',
    memberLanguage: 'English',
    memberCounty: 'Los Angeles',
    referrerFirstName: 'Admin',
    referrerLastName: 'User',
    referrerEmail: 'admin.user@example.com',
    referrerPhone: '(555) 111-2222',
    referrerRelationship: 'System Admin',
    agency: 'Testing Agency',
    bestContactFirstName: 'Primary',
    bestContactLastName: 'Contact',
    bestContactRelationship: 'Spouse',
    bestContactPhone: '(555) 333-4444',
    bestContactEmail: 'primary@contact.com',
    bestContactLanguage: 'English',
    secondaryContactFirstName: 'Secondary',
    secondaryContactLastName: 'Contact',
    secondaryContactRelationship: 'Child',
    secondaryContactPhone: '(555) 555-6666',
    secondaryContactEmail: 'secondary@contact.com',
    secondaryContactLanguage: 'Spanish',
    hasCapacity: 'Yes',
    hasLegalRep: 'Yes',
    repFirstName: 'Legal',
    repLastName: 'Representative',
    repRelationship: 'Lawyer',
    repPhone: '(555) 777-8888',
    repEmail: 'legal@rep.com',
    repLanguage: 'English',
    isRepPrimaryContact: false,
    currentLocation: 'SNF',
    currentAddress: '123 Test St',
    currentCity: 'Testville',
    currentState: 'CA',
    currentZip: '90210',
    currentCounty: 'Los Angeles',
    copyAddress: false,
    customaryAddress: '456 Home Ave',
    customaryCity: 'Hometown',
    customaryState: 'CA',
    customaryZip: '90211',
    customaryCounty: 'Los Angeles',
    healthPlan: 'Kaiser',
    existingHealthPlan: null,
    switchingHealthPlan: null,
    pathway: 'SNF Transition',
    meetsPathwayCriteria: true,
    snfDiversionReason: null,
    ispFirstName: 'ISP',
    ispLastName: 'Coordinator',
    ispRelationship: 'Care Coordinator',
    ispFacilityName: 'Test Facility',
    ispPhone: '(555) 999-0000',
    ispEmail: 'isp@coordinator.com',
    ispCopyCurrent: false,
    ispLocationType: 'Other',
    ispAddress: '789 ISP Way',
    ispCity: 'Ispville',
    ispState: 'CA',
    ispZip: '90213',
    ispCounty: 'Los Angeles',
    onALWWaitlist: 'No',
    hasPrefRCFE: 'Yes',
    rcfeName: 'Preferred RCFE',
    rcfeAdminName: 'RCFE Admin',
    rcfeAdminPhone: '(555) 123-9876',
    rcfeAdminEmail: 'rcfe@admin.com',
    rcfeAddress: '101 RCFE Blvd',
    id: `test-payload-${Date.now()}`,
    caspioSent: true,
};

export const WebhookPreparer = () => {
    const [isSending, setIsSending] = useState(false);
    const { toast } = useToast();

    const handleSendTestWebhook = async () => {
        setIsSending(true);
        const webhookUrl = 'https://hook.us2.make.com/mqif1rouo1wh762k2eze1y7568gwq6kx';
        
        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(samplePayload),
            });

            if (!response.ok) throw new Error(`Server responded with ${response.status}`);

            toast({
                title: 'Webhook Sent!',
                description: 'The sample CS Summary data was sent to Make.com.',
                className: 'bg-green-100 text-green-900 border-green-200',
            });
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: 'Webhook Error',
                description: `Failed to send data: ${error.message}`,
            });
        } finally {
            setIsSending(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Webhook Preparer</CardTitle>
                <CardDescription>Send a sample with all CS Summary fields to Make.com to prepare your scenario for field mapping.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                    Click the button below to send a test payload. Go to your Make.com scenario, click "Run once", and then come back here and click the button. Make.com will receive the data, allowing you to map the fields to your Caspio module.
                </p>
                <Button onClick={handleSendTestWebhook} disabled={isSending} className="w-full">
                    {isSending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                    Send Test Payload to Make.com
                </Button>
                <Separator />
                <h4 className="font-semibold">Sample Payload Fields</h4>
                 <ScrollArea className="h-64 border rounded-md p-4 bg-muted/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 text-sm">
                        {Object.entries(samplePayload).map(([key, value]) => (
                            <div key={key} className="flex gap-2">
                                <span className="font-semibold text-primary">{key}:</span>
                                <span className="text-muted-foreground truncate">
                                    {typeof value === 'object' && value !== null ? JSON.stringify(value) : String(value)}
                                </span>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
};

    