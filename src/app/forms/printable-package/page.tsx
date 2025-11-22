import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

export default function PrintablePackage() {
  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-8 print:space-y-4">
          <div className="text-center print:hidden">
            <h1 className="text-3xl font-bold">Printable Forms Package</h1>
            <p className="text-muted-foreground">All necessary forms in one place for easy printing.</p>
          </div>
          
          {/* CS Member Summary */}
          <Card className="print:shadow-none print:border-none">
            <CardHeader>
              <CardTitle>CS Member Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Member Information */}
              <div className="space-y-2">
                <h3 className="font-semibold">Member Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1"><Label>First Name</Label><Input disabled /></div>
                  <div className="space-y-1"><Label>Last Name</Label><Input disabled /></div>
                  <div className="space-y-1"><Label>Date of Birth (MM/DD/YYYY)</Label><Input disabled /></div>
                  <div className="space-y-1"><Label>Age</Label><Input disabled /></div>
                  <div className="space-y-1"><Label>Medi-Cal Number</Label><Input disabled /></div>
                  <div className="space-y-1"><Label>Confirm Medi-Cal Number</Label><Input disabled /></div>
                  <div className="space-y-1"><Label>Medical Record Number (MRN)</Label><Input disabled /></div>
                  <div className="space-y-1"><Label>Confirm Medical Record Number</Label><Input disabled /></div>
                  <div className="col-span-2 space-y-1"><Label>Preferred Language</Label><Input disabled /></div>
                </div>
              </div>
              <Separator />

              {/* Your Information */}
              <div className="space-y-2">
                <h3 className="font-semibold">Your Information (Person Filling Out Form)</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1"><Label>First Name</Label><Input disabled /></div>
                    <div className="space-y-1"><Label>Last Name</Label><Input disabled /></div>
                    <div className="space-y-1"><Label>Relationship to Member</Label><Input disabled /></div>
                    <div className="space-y-1"><Label>Referral Source Name</Label><Input disabled /></div>
                    <div className="space-y-1"><Label>Your Phone</Label><Input disabled /></div>
                    <div className="space-y-1"><Label>Your Email</Label><Input disabled /></div>
                </div>
              </div>
              <Separator />

              {/* Member Contact */}
              <div className="space-y-4">
                <h3 className="font-semibold">Member Contact Information</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1"><Label>Member Phone</Label><Input disabled /></div>
                    <div className="space-y-1"><Label>Member Email</Label><Input disabled /></div>
                </div>
                <div className="flex items-center space-x-2"><Checkbox id="best-contact-printable" disabled /><Label htmlFor="best-contact-printable">Member is the best contact person.</Label></div>
                <div className="p-4 border rounded-md space-y-4">
                    <h4 className="font-medium">Best Contact Person</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1"><Label>First Name</Label><Input disabled /></div>
                        <div className="space-y-1"><Label>Last Name</Label><Input disabled /></div>
                        <div className="space-y-1"><Label>Relationship to Member</Label><Input disabled /></div>
                        <div className="space-y-1"><Label>Phone</Label><Input disabled /></div>
                        <div className="space-y-1"><Label>Email</Label><Input disabled /></div>
                        <div className="space-y-1"><Label>Best Contact's Preferred Language</Label><Input disabled /></div>
                    </div>
                </div>
              </div>
              <Separator />

              {/* Legal Representative */}
              <div className="space-y-4">
                  <h3 className="font-semibold">Legal Representative</h3>
                  <div className="space-y-2">
                      <Label>Does member have capacity to make own health care decisions?</Label>
                      <RadioGroup className="flex space-x-4"><RadioGroupItem value="yes" id="p-cap-yes" disabled /><Label htmlFor="p-cap-yes">Yes</Label><RadioGroupItem value="no" id="p-cap-no" disabled /><Label htmlFor="p-cap-no">No</Label></RadioGroup>
                  </div>
                   <div className="space-y-2">
                      <Label>If no capacity, does he/she have a legal Authorized Rep (AR)?</Label>
                      <RadioGroup className="flex space-x-4"><RadioGroupItem value="yes" id="p-ar-yes" disabled /><Label htmlFor="p-ar-yes">Yes</Label><RadioGroupItem value="no" id="p-ar-no" disabled /><Label htmlFor="p-ar-no">No</Label><RadioGroupItem value="na" id="p-ar-na" disabled /><Label htmlFor="p-ar-na">N/A</Label></RadioGroup>
                  </div>
                  <div className="flex items-center space-x-2"><Checkbox id="poa-same-printable" disabled /><Label htmlFor="poa-same-printable">POA/AR is the same as the Best Contact.</Label></div>
                  <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1"><Label>POA/AR First Name</Label><Input disabled /></div>
                      <div className="space-y-1"><Label>POA/AR Last Name</Label><Input disabled /></div>
                      <div className="space-y-1"><Label>POA/AR Relationship to Member</Label><Input disabled /></div>
                      <div className="space-y-1"><Label>POA/AR Phone</Label><Input disabled /></div>
                      <div className="col-span-2 space-y-1"><Label>POA/AR Email</Label><Input disabled /></div>
                  </div>
              </div>

            </CardContent>
          </Card>

           <Card className="print:shadow-none print:border-none">
            <CardHeader>
              <CardTitle>HIPAA Authorization Form</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <p>This form, when completed and signed by you, authorizes the use and/or disclosure of your protected health information. The information authorized for release may include information related to HIV/AIDS, mental health, and substance use, unless specified otherwise.</p>
                <div className="grid grid-cols-2 gap-4 items-end">
                     <div className="space-y-1"><Label>Patient Name</Label><Input disabled /></div>
                     <div className="space-y-1"><Label>Medi-Cal Number</Label><Input disabled /></div>
                </div>
                <div className="space-y-4">
                    <div><p className="font-medium text-sm">Person(s) or organization(s) authorized to make the disclosure:</p><p className="text-sm text-muted-foreground">any health care related agency or person providing information for the purpose of applying for the CalAIM CS for Assisted Living Transitions</p></div>
                    <div><p className="font-medium text-sm">Person(s) or organization(s) authorized to receive the information:</p><p className="text-sm text-muted-foreground">Connections Care Home Consultants, LLC</p></div>
                     <div><p className="font-medium text-sm">Specific information to be disclosed:</p><p className="text-sm text-muted-foreground">All medical records necessary for Community Supports (CS) application.</p></div>
                </div>
                <div className="space-y-2">
                    <Label>Do you authorize the release of sensitive information?</Label>
                    <RadioGroup className="flex space-x-4"><RadioGroupItem value="yes" id="p-sens-yes" disabled /><Label htmlFor="p-sens-yes">Yes</Label><RadioGroupItem value="no" id="p-sens-no" disabled /><Label htmlFor="p-sens-no">No</Label></RadioGroup>
                </div>
                <div className="space-y-2">
                    <Label>Who is signing this form?</Label>
                    <RadioGroup className="flex space-x-4"><RadioGroupItem value="member" id="p-sign-mem" disabled /><Label htmlFor="p-sign-mem">I am (the member)</Label><RadioGroupItem value="rep" id="p-sign-rep" disabled /><Label htmlFor="p-sign-rep">An authorized representative</Label></RadioGroup>
                </div>
                 <div className="grid grid-cols-3 gap-4 border-t pt-4">
                    <div className="col-span-2 space-y-1"><Label>Signature (Full Name)</Label><Input disabled /></div>
                    <div className="space-y-1"><Label>Date</Label><Input disabled type="date" /></div>
                </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
