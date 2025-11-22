
'use client';

import { useFormContext } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

export default function Step3() {
  const { control } = useFormContext();
  
  return (
    <div className="space-y-6">
       <Card className="border-l-4 border-accent">
        <CardHeader>
          <CardTitle>Health Plan</CardTitle>
          <CardDescription>Select the member's Managed Care Plan (MCP).</CardDescription>
        </CardHeader>
        <CardContent>
          <FormField
            control={control}
            name="healthPlan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Health Plan</FormLabel>
                <FormControl>
                  <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                    <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Kaiser" /></FormControl><FormLabel className="font-normal">Kaiser Permanente</FormLabel></FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Health Net" /></FormControl><FormLabel className="font-normal">Health Net</FormLabel></FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Other" /></FormControl><FormLabel className="font-normal">Other</FormLabel></FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      <Card className="border-l-4 border-accent">
        <CardHeader>
          <CardTitle>Pathway & Eligibility</CardTitle>
          <CardDescription>Choose the pathway that best describes the member's situation.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <FormField
            control={control}
            name="pathway"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Pathway Selection</FormLabel>
                <FormControl>
                  <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormItem>
                      <RadioGroupItem value="SNF Transition" id="snf_transition" className="peer sr-only" />
                      <Label htmlFor="snf_transition" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                        <h3 className="font-semibold">SNF Transition</h3>
                        <p className="text-sm text-muted-foreground mt-2 text-center">For members currently in a Skilled Nursing Facility who want to move to a community setting.</p>
                      </Label>
                    </FormItem>
                    <FormItem>
                      <RadioGroupItem value="SNF Diversion" id="snf_diversion" className="peer sr-only" />
                      <Label htmlFor="snf_diversion" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                        <h3 className="font-semibold">SNF Diversion</h3>
                        <p className="text-sm text-muted-foreground mt-2 text-center">For members at risk of SNF admission who can be safely cared for in the community.</p>
                      </Label>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

            <div className="space-y-4 p-4 border rounded-md">
                <h3 className="font-semibold text-lg">SNF Transition Eligibility Requirements</h3>
                <p className="text-sm text-muted-foreground">Enables a current SNF resident to transfer to a RCFE or ARF.</p>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>Has resided in a SNF for at least 60 consecutive days (which can include a combination of Medicare and Medi-Cal days and back and forth from SNF-hospital-SNF); and</li>
                    <li>Is willing to live in RCFE as an alternative to a SNF; and</li>
                    <li>Is able to safely reside in RCFE with appropriate and cost-effective supports and services.</li>
                </ul>
                <FormField
                    control={control}
                    name="meetsSnfTransitionCriteria"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 mt-4">
                            <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>All criteria for SNF Transition have been met.</FormLabel>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
          
            <div className="space-y-4 p-4 border rounded-md">
                 <h3 className="font-semibold text-lg">SNF Diversion Eligibility Requirements</h3>
                 <p className="text-sm text-muted-foreground">Transition a member who, without this support, would need to reside in a SNF and instead transitions him/her to RCFE or ARF.</p>
                 <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>Interested in remaining in the community; and</li>
                    <li>Is able to safely reside in RCFE with appropriate and cost-effective supports and services; and</li>
                    <li>Must be currently at medically necessary SNF level of care: e.g., require substantial help with activities of daily living (help with dressing, bathing, incontinence, etc.) or at risk of premature institutionalization; and meet the criteria to receive those services in RCFE or ARF.</li>
                 </ul>
                 <FormField
                    control={control}
                    name="meetsSnfDiversionCriteria"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 mt-4">
                            <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>All criteria for SNF Diversion have been met.</FormLabel>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={control}
                    name="snfDiversionReason"
                    render={({ field }) => (
                        <FormItem className="mt-4">
                        <FormLabel>Reason for SNF Diversion</FormLabel>
                        <FormControl>
                            <Textarea {...field} value={field.value ?? ''} placeholder="Provide a brief explanation for the diversion..." />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
