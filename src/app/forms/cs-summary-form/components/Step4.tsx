
'use client';

import { useFormContext } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

export default function Step4() {
  const { control } = useFormContext();
  
  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-accent">
          <CardHeader>
            <CardTitle>Individual Service Plan (ISP) Contact</CardTitle>
            <CardDescription>Contact person for the member's service plan.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={control} name="ispFirstName" render={({ field }) => (
                    <FormItem><FormLabel>First Name</FormLabel><FormControl><Input {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
                )} />
                 <FormField control={control} name="ispLastName" render={({ field }) => (
                    <FormItem><FormLabel>Last Name</FormLabel><FormControl><Input {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={control} name="ispRelationship" render={({ field }) => (
                    <FormItem><FormLabel>Relationship to Member</FormLabel><FormControl><Input {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={control} name="ispFacilityName" render={({ field }) => (
                    <FormItem><FormLabel>Facility Name</FormLabel><FormControl><Input {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={control} name="ispPhone" render={({ field }) => (
                    <FormItem><FormLabel>Phone</FormLabel><FormControl><Input type="tel" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={control} name="ispEmail" render={({ field }) => (
                    <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
          </CardContent>
      </Card>
       <Card className="border-l-4 border-accent">
          <CardHeader>
            <CardTitle>ISP Assessment Location</CardTitle>
            <CardDescription>Where the ISP assessment will take place.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField control={control} name="ispCopyCurrent" render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><div className="space-y-1 leading-none"><FormLabel>ISP contact location is same as member's current location</FormLabel></div></FormItem>
            )} />
            <FormField control={control} name="ispCopyCustomary" render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><div className="space-y-1 leading-none"><FormLabel>ISP contact location is same as member's customary residence</FormLabel></div></FormItem>
            )} />
            <div className="space-y-4 p-4 border rounded-md">
                <FormField control={control} name="ispAddress" render={({ field }) => (
                    <FormItem><FormLabel>Address</FormLabel><FormControl><Input {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
                )} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={control} name="ispCity" render={({ field }) => (
                        <FormItem><FormLabel>City</FormLabel><FormControl><Input {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={control} name="ispState" render={({ field }) => (
                        <FormItem><FormLabel>State</FormLabel><FormControl><Input {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
                    )} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={control} name="ispZip" render={({ field }) => (
                        <FormItem><FormLabel>Zip Code</FormLabel><FormControl><Input {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={control} name="ispCounty" render={({ field }) => (
                        <FormItem><FormLabel>County</FormLabel><FormControl><Input {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
                    )} />
                </div>
            </div>
          </CardContent>
       </Card>

        <Card className="border-l-4 border-accent">
            <CardHeader><CardTitle>Assisted Living Waiver (ALW) Status</CardTitle></CardHeader>
            <CardContent>
                <FormField
                    control={control}
                    name="onALWWaitlist"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                        <FormLabel>Is the member currently on the ALW waitlist?</FormLabel>
                        <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value ?? undefined} className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                                <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Yes" /></FormControl><FormLabel className="font-normal">Yes</FormLabel></FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="No" /></FormControl><FormLabel className="font-normal">No</FormLabel></FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Unknown" /></FormControl><FormLabel className="font-normal">Unknown</FormLabel></FormItem>
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
            <CardTitle>RCFE Selection</CardTitle>
            <CardDescription>Residential Care Facility for the Elderly selection status.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={control}
            name="hasPrefRCFE"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Has a preferred assisted living facility (RCFE) been chosen?</FormLabel>
                <FormControl>
                  <RadioGroup onValueChange={field.onChange} defaultValue={field.value ?? undefined} className="flex items-center space-x-4">
                    <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Yes" /></FormControl><FormLabel className="font-normal">Yes</FormLabel></FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="No" /></FormControl><FormLabel className="font-normal">No</FormLabel></FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="p-4 border rounded-md space-y-4">
              <h3 className="font-medium">Preferred Facility Details</h3>
              <FormField control={control} name="rcfeName" render={({ field }) => (
                  <FormItem><FormLabel>Facility Name</FormLabel><FormControl><Input {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={control} name="rcfeAddress" render={({ field }) => (
                  <FormItem><FormLabel>Facility Address</FormLabel><FormControl><Input {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
              )} />
               <FormField control={control} name="rcfeAdminName" render={({ field }) => (
                  <FormItem><FormLabel>Administrator Name</FormLabel><FormControl><Input {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
              )} />
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={control} name="rcfeAdminPhone" render={({ field }) => (
                      <FormItem><FormLabel>Administrator Phone</FormLabel><FormControl><Input type="tel" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={control} name="rcfeAdminEmail" render={({ field }) => (
                      <FormItem><FormLabel>Administrator Email</FormLabel><FormControl><Input type="email" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
                  )} />
              </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

    