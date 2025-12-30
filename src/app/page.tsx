'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import imageData from '@/lib/placeholder-images.json';
import { Header } from '@/components/Header';
import React, { useState, useEffect } from 'react';

// New component to capture and display console logs
function ConsoleLog({ onClear }: { onClear: () => void }) {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;

    const captureLog = (method: 'log' | 'warn' | 'error') => (...args: any[]) => {
      const message = args.map(arg => {
        try {
          return typeof arg === 'object' ? JSON.stringify(arg) : String(arg);
        } catch (e) {
          return 'Unserializable object';
        }
      }).join(' ');

      setLogs(prevLogs => [`[${new Date().toLocaleTimeString()}] [${method.toUpperCase()}] ${message}`, ...prevLogs]);
      
      // Call the original console method
      if (method === 'error') originalError(...args);
      else if (method === 'warn') originalWarn(...args);
      else originalLog(...args);
    };

    console.log = captureLog('log');
    console.error = captureLog('error');
    console.warn = captureLog('warn');

    return () => {
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;
    };
  }, []);

  return (
    <Card className="mt-8 w-full max-w-4xl shadow-md">
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
          <CardTitle>Startup Log</CardTitle>
          <CardDescription>Displaying console messages to debug performance.</CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={onClear}>Clear Log</Button>
      </CardHeader>
      <CardContent>
        <div className="bg-muted p-4 rounded-lg h-48 overflow-y-auto text-xs font-mono">
          {logs.length > 0 ? logs.map((log, i) => (
            <p key={i} className="whitespace-pre-wrap break-all">{log}</p>
          )) : <p className="text-muted-foreground">No logs captured yet. Any server restart messages or errors will appear here.</p>}
        </div>
      </CardContent>
    </Card>
  );
}


export default function Home() {
  const mascot = imageData.placeholderImages.find(p => p.id === 'fox-mascot');
  const [showLog, setShowLog] = useState(true);

  return (
    <>
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        <Card className="w-full max-w-4xl shadow-2xl">
          <CardHeader className="items-center text-center p-6 sm:p-10">
            {mascot && (
              <Image
                src={mascot.imageUrl}
                alt={mascot.description}
                width={200}
                height={200}
                data-ai-hint={mascot.imageHint}
                className="w-40 h-40 sm:w-48 sm:h-48 object-contain rounded-full mb-6"
              />
            )}
            <CardTitle className="text-3xl sm:text-5xl font-bold">Connect CalAIM</CardTitle>
            <CardDescription className="text-md sm:text-lg max-w-2xl mt-2">
              The Connections Care Home Consultants application portal for the California
              Advancing and Innovating Medi-Cal (CalAIM) Community Support for Assisted
              Transitions (SNF Diversion/Transition) for Health Net and Kaiser.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center p-6 pt-0 sm:pb-10">
             <Button asChild size="lg" className="text-lg py-7 px-8">
                <Link href="/info">
                  Let's Go!
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
          </CardContent>
        </Card>
        {showLog && <ConsoleLog onClear={() => setShowLog(false)} />}
      </main>
    </>
  );
}
