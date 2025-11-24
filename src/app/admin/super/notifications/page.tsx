
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function NotificationSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Notification Settings</h1>
        <p className="text-muted-foreground">Configure who receives email notifications for important events.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Manage Notifications</CardTitle>
          <CardDescription>
            This is a placeholder for the notification settings interface.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Future functionality will be built here to:</p>
          <ul className="list-disc list-inside mt-4 space-y-2">
            <li>Designate which staff members receive an email when a new application is submitted.</li>
            <li>Configure notifications for when documents are uploaded via the secure portal.</li>
            <li>Set up other system alerts.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
