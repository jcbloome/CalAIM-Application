import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, FileWarning, PenSquare, ArrowLeft, Trash2 } from 'lucide-react';
import { applications } from '@/lib/data';

export default function AdminApplicationDetailPage({ params }: { params: { id: string } }) {
  const application = applications.find(app => app.id === params.id);

  if (!application) {
    notFound();
  }

  const completedForms = application.forms.filter(f => f.status === 'Completed').length;
  const totalForms = application.forms.length;
  const progress = totalForms > 0 ? (completedForms / totalForms) * 100 : 100;

  return (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
            <Button asChild variant="outline">
                <Link href="/admin/applications">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to All Applications
                </Link>
            </Button>
            <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Application
            </Button>
        </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">Application: {application.id}</CardTitle>
              <CardDescription>
                Member: <strong>{application.memberName}</strong> | Pathway: <strong>{application.pathway}</strong> | Status: <strong>{application.status}</strong>
              </CardDescription>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-muted-foreground">Completion</p>
              <p className="text-2xl font-bold">{Math.round(progress)}%</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={progress} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Forms & Documents</CardTitle>
          <CardDescription>Review submitted materials and request revisions if needed.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {application.forms.map(form => (
              <div key={form.name} className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-4">
                  {form.status === 'Completed' ? (
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                  ) : (
                    <PenSquare className="h-6 w-6 text-yellow-500" />
                  )}
                  <div>
                    <p className="font-medium">{form.name}</p>
                    <p className="text-sm text-muted-foreground">Type: {form.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="secondary" size="sm">
                        <FileWarning className="mr-2 h-4 w-4" />
                        Request Revision
                    </Button>
                </div>
              </div>
            ))}
            {application.forms.length === 0 && (
                <div className="text-center p-8 text-muted-foreground">No forms required for this pathway yet.</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
