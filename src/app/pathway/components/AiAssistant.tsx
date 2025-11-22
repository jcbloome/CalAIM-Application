'use client';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2, Lightbulb, AlertTriangle, ListChecks } from 'lucide-react';
import { suggestNextSteps, SuggestNextStepsOutput } from '@/ai/flows/ai-suggest-next-steps';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type AiAssistantProps = {
  applicationData: any;
};

export default function AiAssistant({ applicationData }: AiAssistantProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SuggestNextStepsOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGetSuggestions = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const suggestions = await suggestNextSteps({
        applicationData,
        currentStep: 'Pathway Review',
      });
      setResult(suggestions);
    } catch (e) {
      console.error(e);
      setError('Failed to get AI suggestions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="md:col-span-2 lg:col-span-3 bg-primary/5 border-primary/20">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Sparkles className="h-6 w-6 text-primary" />
          <CardTitle className="text-primary">AI Assistant</CardTitle>
        </div>
        <CardDescription>Get AI-powered suggestions to complete your application faster.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-4">Analyzing application...</p>
          </div>
        ) : result ? (
          <div className="space-y-4">
             {result.requiresManualIntervention && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Manual Intervention Recommended</AlertTitle>
                <AlertDescription>
                  Our AI suggests this application may need special attention. A case manager will review it closely.
                </AlertDescription>
              </Alert>
            )}
            <Accordion type="single" collapsible defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                    <div className="flex items-center gap-2">
                        <ListChecks className="h-5 w-5 text-primary" />
                        <span>Suggested Next Steps</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-6 space-y-2">
                    {result.nextSteps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              {Object.keys(result.missingInformation).length > 0 && (
                <AccordionItem value="item-2">
                    <AccordionTrigger>
                        <div className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-yellow-500" />
                            <span>Missing Information</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                    <ul className="list-disc pl-6 space-y-2">
                        {Object.entries(result.missingInformation).map(([field, reasons]) => (
                        <li key={field}>
                            <strong>{field}:</strong> {reasons.join(', ')}
                        </li>
                        ))}
                    </ul>
                    </AccordionContent>
                </AccordionItem>
              )}
               {result.priorityFields.length > 0 && (
                <AccordionItem value="item-3">
                    <AccordionTrigger>
                        <div className="flex items-center gap-2">
                            <Lightbulb className="h-5 w-5 text-blue-500" />
                            <span>Priority Fields</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                    <p>Our AI recommends focusing on these fields first:</p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                        {result.priorityFields.map((field, i) => (
                            <li key={i}>{field}</li>
                        ))}
                    </ul>
                    </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
             <Button onClick={() => setResult(null)} variant="outline" className="mt-4 w-full">Clear Suggestions</Button>
          </div>
        ) : (
          <div>
            {error && <p className="text-destructive mb-4">{error}</p>}
            <Button onClick={handleGetSuggestions} className="w-full">
              <Sparkles className="mr-2 h-4 w-4" /> Get AI Suggestions
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
