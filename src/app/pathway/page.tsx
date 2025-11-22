import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, FileDown, FileUp, PenSquare } from 'lucide-react';
import { applications } from '@/lib/data';
import { Header } from '@/components/Header';
import AiAssistant from './components/AiAssistant';

function PathwayPageContent({ applicationId }: { applicationId: string }) {
  const application = applications.find(app => app.id === applicationId) || applications[0];

  if (!application) {
    notFound();
  }

  const completedForms = application.forms.filter(f => f.status === 'Completed').length;
  const totalForms = application.forms.length;
  const progress = totalForms > 0 ? (completedForms / totalForms) * 100 : 100;

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl text-primary">{application.pathway}</CardTitle>
                  <CardDescription>Member: {application.memberName} | Status: {application.status}</CardDescription>
                </div>
                <div className="text-right">
                    <p className="text-sm font-medium text-muted-foreground">Progress</p>
                    <p className="text-2xl font-bold">{Math.round(progress)}%</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={progress} />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {application.forms.map(form => (
              <Card key={form.name} className="flex flex-col">
                <CardHeader className="flex-row items-center justify-between pb-2">
                  <CardTitle className="text-base font-medium">{form.name}</CardTitle>
                  {form.status === 'Completed' ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <PenSquare className="h-5 w-5 text-yellow-500" />
                  )}
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-end">
                  <p className={`text-sm mb-4 ${form.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}`}>
                    Status: {form.status}
                  </p>
                  {form.type === 'Form' ? (
                    <Button variant="outline" className="w-full">
                      <PenSquare className="mr-2 h-4 w-4" />
                      {form.status === 'Completed' ? 'View Form' : 'Fill Out Form'}
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <Button variant="secondary" className="w-full">
                        <FileDown className="mr-2 h-4 w-4" /> Download PDF
                      </Button>
                      <Button variant="outline" className="w-full">
                        <FileUp className="mr-2 h-4 w-4" /> Upload Signed Doc
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}

             <AiAssistant applicationData={application} />
          </div>
        </div>
      </main>
    </>
  );
}


export default function PathwayPage({ searchParams }: { searchParams: { applicationId: string }}) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PathwayPageContent applicationId={searchParams.applicationId} />
        </Suspense>
    )
}
