
'use client';

import { useFormContext } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function Step3() {
  const { control, watch } = useFormContext();
  const pathway = watch('pathway');
  
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
                <FormLabel>Health Plan <span className="text-destructive">*</span></FormLabel>
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
                <FormLabel>Pathway Selection <span className="text-destructive">*</span></FormLabel>
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

          {pathway === 'SNF Transition' && (
            <div className="space-y-4 p-4 border rounded-md">
                <FormField
                    control={control}
                    name="snfTransitionEligibility"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                        <FormLabel>Does the member meet all criteria for SNF Transition?</FormLabel>
                        <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                                <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Yes" /></FormControl><FormLabel className="font-normal">Yes</FormLabel></FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="No" /></FormControl><FormLabel className="font-normal">No</FormLabel></FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="N/A" /></FormControl><FormLabel className="font-normal">N/A</FormLabel></FormItem>
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
          )}
          
          {pathway === 'SNF Diversion' && (
            <div className="space-y-4 p-4 border rounded-md">
                 <FormField
                    control={control}
                    name="snfDiversionEligibility"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                        <FormLabel>Does the member meet all criteria for SNF Diversion?</FormLabel>
                        <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                                <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Yes" /></FormControl><FormLabel className="font-normal">Yes</FormLabel></FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="No" /></FormControl><FormLabel className="font-normal">No</FormLabel></FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="N/A" /></FormControl><FormLabel className="font-normal">N/A</FormLabel></FormItem>
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={control}
                    name="snfDiversionReason"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Reason for SNF Diversion</FormLabel>
                        <FormControl>
                            <Textarea {...field} value={field.value ?? ''} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
