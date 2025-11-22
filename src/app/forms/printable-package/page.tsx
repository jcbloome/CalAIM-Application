
'use client';

import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Printer, ArrowRight, ExternalLink, UploadCloud, Send } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const forms = [
    { name: 'CS Member Summary', icon: FileText, href: '/forms/cs-summary-form/printable' },
    { name: 'Program Information & Acknowledgment', icon: FileText, href: '/info' },
    { name: 'HIPAA Authorization', icon: FileText, href: '/forms/hipaa-authorization/printable' },
    { name: 'Liability Waiver', icon: FileText, href: '/forms/liability-waiver/printable' },
    { name: 'Freedom of Choice Waiver', icon: FileText, href: '/forms/freedom-of-choice/printable' },
    { name: 'Declaration of Eligibility (for SNF Diversion only)', icon: FileText, href: '/forms/declaration-of-eligibility/printable' },
    { name: 'LIC 602A - Physician\'s Report', icon: ExternalLink, href: 'https://www.cdss.ca.gov/cdssweb/entres/forms/english/lic602a.pdf', target: '_blank' },
];


export default function ApplicationSubmissionPage() {

  const handlePrint = () => {
    // This would ideally print a curated package of all forms.
    // For now, it can just print this page or a specific component.
    window.print();
  };

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Application Submission Methods</h1>
                <p className="text-muted-foreground">There are two ways to submit your application documents. Please choose the one that works best for you.</p>
            </div>

            <Card className="border-green-500 border-2 bg-green-50/30">
                <CardHeader>
                    <CardTitle className="text-xl">1. Online Application (Recommended)</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-4">
                        This is the fastest and most direct way to submit your application. The CS Member Summary form can be downloaded, filled out and uploaded but since the data does need to be inputted through the online portal (by the Connections staff) consider using the online form for the quickest processing for the application.
                    </p>
                    <Button asChild>
                        <Link href="/forms/cs-summary-form">
                            Start Online Application <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">2. Manual Download & Upload</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-6">
                        If you prefer to work offline, you can download the blank forms below, complete and sign them, and then upload them all through the secure portal at the bottom of this section. <strong>Do not email completed forms;</strong> for security and HIPAA compliance, please only use the secure upload portal. If you have questions, you may email us at calaim@carehomefinders.com.
                    </p>

                    <Card className="bg-muted/30">
                        <CardHeader>
                            <CardTitle>Print Blank Forms</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground mb-4">Print individual forms:</p>
                                {forms.map((form) => (
                                    <Button key={form.name} variant="outline" className="w-full justify-start text-left bg-background" asChild>
                                      <Link href={form.href} target={form.target || '_self'}>
                                        <form.icon className="mr-2 h-4 w-4" />
                                        {form.name}
                                      </Link>
                                    </Button>
                                ))}
                                <div className="pt-4">
                                     <Button className="w-full" onClick={handlePrint}>
                                        <Printer className="mr-2 h-4 w-4" />
                                        Print Full Blank Application Package
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Secure Document Upload Portal</CardTitle>
                    <CardDescription>Use this form to securely upload your completed and signed documents without needing to log in.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="fullName">Your Full Name</Label>
                                <Input id="fullName" placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Your Email Address</Label>
                                <Input id="email" type="email" placeholder="john.doe@example.com" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="memberFullName">Member's Full Name</Label>
                                <Input id="memberFullName" placeholder="Jane Smith" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="mediCalNumber">Member's Medi-Cal Number</Label>
                                <Input id="mediCalNumber" placeholder="987654321A" />
                            </div>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="healthPlan">Member's Health Plan</Label>
                             <Select>
                                <SelectTrigger id="healthPlan">
                                    <SelectValue placeholder="Select a health plan" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="kaiser">Kaiser Permanente</SelectItem>
                                    <SelectItem value="health-net">Health Net</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-sm text-muted-foreground">
                                Select 'Other' for members switching to Health Net or Kaiser but who do not yet have it.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="documentsUploaded">Names of Documents Uploaded</Label>
                            <Textarea id="documentsUploaded" placeholder="e.g., HIPAA Authorization, Liability Waiver, Physician's Report..." />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="fileUpload">Upload Documents</Label>
                            <div className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                                    <UploadCloud className="w-8 h-8 mb-2 text-gray-400" />
                                    <p className="font-semibold">Click or drag files here to upload</p>
                                    <p className="text-xs text-gray-500">PDF, JPG, PNG up to 5MB.</p>
                                </div>
                                <Input id="fileUpload" type="file" className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" multiple />
                            </div>
                        </div>
                         <Button type="submit" className="w-full">
                            <Send className="mr-2 h-4 w-4" />
                            Submit Documents
                        </Button>
                    </form>
                </CardContent>
            </Card>

        </div>
      </main>
    </>
  );
}

    
