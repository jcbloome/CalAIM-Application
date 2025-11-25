
import { Application, Acronym, Activity } from './definitions';
import { format } from 'date-fns';

export const applications: (Application & { healthPlan?: string; referrerName?: string; ispContactName?: string; agency?: string; })[] = [
  {
    id: 'app-001',
    memberName: 'John Doe',
    status: 'In Progress',
    healthPlan: 'Kaiser Permanente',
    lastUpdated: '2023-10-26',
    pathway: 'SNF Transition',
    progress: 40,
    forms: [
      { name: 'CS Member Summary', status: 'Completed', type: 'Form', href: '/forms/cs-summary-form' },
      { name: 'HIPAA Authorization', status: 'Completed', type: 'Form', href: '/forms/hipaa-authorization' },
      { name: 'Liability Waiver', status: 'Pending', type: 'Upload', href: '#', downloadHref: '#' },
      { name: 'Proof of Income', status: 'Pending', type: 'Upload', href: '#', downloadHref: '#' },
      { name: 'Physician\'s Report', status: 'Pending', type: 'Upload', href: '#', downloadHref: '#' },
    ],
    referrerName: 'Jason Bloome',
    ispContactName: 'Dr. Emily Carter',
    agency: 'Care Home Finders',
  },
  {
    id: 'app-002',
    memberName: 'Jane Smith',
    status: 'Requires Revision',
    healthPlan: 'Health Net',
    lastUpdated: '2023-10-25',
    pathway: 'SNF Diversion',
    progress: 75,
    forms: [
      { name: 'CS Member Summary', status: 'Completed', type: 'Form', href: '/forms/cs-summary-form' },
      { name: 'HIPAA Authorization', status: 'Pending', type: 'Form', href: '/forms/hipaa-authorization' },
      { name: 'Liability Waiver', status: 'Pending', type: 'Upload', href: '#', downloadHref: '#' },
      { name: 'Freedom of Choice Waiver', status: 'Pending', type: 'Upload', href: '#', downloadHref: '#' },
      { name: 'Declaration of Eligibility (SNF Diversion)', status: 'Pending', type: 'Upload', href: '#', downloadHref: '#' },
      { name: 'Program Information', status: 'Pending', type: 'Info', href: '/info' },
    ],
    referrerName: 'Social Worker Agency',
    ispContactName: 'Dr. Michael Ramirez',
    agency: 'Social Worker Agency',
  },
  {
    id: 'd311d971-e3af-43ab-9fc2-89065ee78e8a',
    memberName: 'Jane Smith (Test)',
    status: 'In Progress',
    healthPlan: 'Health Net',
    lastUpdated: '2023-09-28',
    pathway: 'SNF Diversion',
    progress: 25,
    forms: [
      { name: 'CS Member Summary', status: 'Completed', type: 'Form', href: '/forms/cs-summary-form' },
      { name: 'HIPAA Authorization', status: 'Completed', type: 'Form', href: '/forms/hipaa-authorization' },
      { name: 'Liability Waiver', status: 'Pending', type: 'online-form', href: '#' },
      { name: 'Freedom of Choice Waiver', status: 'Pending', type: 'online-form', href: '#' },
      { name: 'Declaration of Eligibility (SNF Diversion)', status: 'Pending', type: 'upload', href: '#' },
       { name: 'Program Information', status: 'Pending', type: 'info', href: '/info' },
    ],
     referrerName: 'Jason Bloome',
    ispContactName: 'Dr. Emily Carter',
    agency: 'Care Home Finders',
  },
  {
    id: 'app-003',
    memberName: 'Peter Jones',
    status: 'Completed & Submitted',
    healthPlan: 'Kaiser Permanente',
    lastUpdated: '2023-09-24',
    pathway: 'SNF Transition',
    progress: 100,
    forms: [],
    referrerName: 'Hospital Discharge Planner',
    ispContactName: 'Dr. Sarah Connor',
    agency: 'Community Hospital',
  },
  {
    id: 'app-004',
    memberName: 'Mary Johnson',
    status: 'Approved',
    healthPlan: 'Health Net',
    lastUpdated: '2023-08-20',
    pathway: 'SNF Diversion',
    progress: 100,
    forms: [],
     referrerName: 'Jason Bloome',
    ispContactName: 'Dr. Michael Ramirez',
    agency: 'Care Home Finders',
  },
    {
    id: 'app-005',
    memberName: 'Chris Lee',
    status: 'In Progress',
    healthPlan: 'Kaiser Permanente',
    lastUpdated: '2023-08-27',
    pathway: 'SNF Diversion',
    progress: 15,
    forms: [],
    referrerName: 'Family Member',
    ispContactName: 'Dr. Emily Carter',
    agency: 'N/A',
  },
];

export const acronyms: Acronym[] = [
  { term: 'ARF', definition: 'Adult Residential Facility' },
  { term: 'CalAIM', definition: 'California Advancing and Innovating Medi-Cal' },
  { term: 'CS', definition: 'Community Supports' },
  { term: 'DOB', definition: 'Date of Birth' },
  { term: 'HIPAA', definition: 'Health Insurance Portability and Accountability Act' },
  { term: 'ISP', definition: 'Individual Service Plan' },
  { term: 'MCP', definition: 'Managed Care Plan' },
  { term: 'MRN', definition: 'Medical Record Number' },
  { term: 'RCFE', definition: 'Residential Care Facility for the Elderly' },
  { term: 'SNF', definition: 'Skilled Nursing Facility' },
  { term: 'SOC', definition: 'Share of Cost' },
];

export const activities: Activity[] = [
  { id: 'act-1', user: 'Admin', action: 'Status Change', timestamp: '2023-10-27 10:00 AM', details: 'Application #app-002 status changed to "Requires Revision".' },
  { id: 'act-2', user: 'Jane Smith', action: 'Form Submitted', timestamp: '2023-10-27 09:45 AM', details: 'Submitted "Proof of Income" for application #app-002.' },
  { id: 'act-3', user: 'Admin', action: 'New Application', timestamp: '2023-10-27 09:30 AM', details: 'Application #app-005 created for Chris Lee.' },
  { id: 'act-4', user: 'John Doe', action: 'Form Started', timestamp: '2023-10-26 03:15 PM', details: 'Started "Liability Waiver" for application #app-001.' },
  { id: 'act-5', user: 'Admin', action: 'Application Approved', timestamp: '2023-10-25 11:00 AM', details: 'Application #app-004 was approved.' },
];

type Stats = {
  byMcp: { name: string; value: number }[];
  byPathway: { name: string; value: number }[];
  byCounty: { name: string; value: number }[];
  monthly: { month: string; total: number }[];
  topIspContacts: { name: string; value: number }[];
  topReferrers: { name: string; value: number }[];
};

const calculateStats = (apps: typeof applications): Stats => {
  const byMcp: Record<string, number> = {};
  const byPathway: Record<string, number> = {};
  const byCounty: Record<string, number> = {};
  const monthly: Record<string, number> = {};
  const topIspContacts: Record<string, number> = {};
  const topReferrers: Record<string, number> = {};

  for (const app of apps) {
    if (app.healthPlan) {
      byMcp[app.healthPlan] = (byMcp[app.healthPlan] || 0) + 1;
    }
    if (app.pathway) {
      byPathway[app.pathway] = (byPathway[app.pathway] || 0) + 1;
    }
    // `memberCounty` doesn't exist on the base type, so we'll assume it might.
    const county = (app as any).memberCounty;
    if (county) {
        byCounty[county] = (byCounty[county] || 0) + 1;
    }

    if (app.lastUpdated) {
        try {
            const month = format(new Date(app.lastUpdated), 'MMM');
            monthly[month] = (monthly[month] || 0) + 1;
        } catch (e) {
            console.error(`Invalid date format for app ${app.id}: ${app.lastUpdated}`);
        }
    }

    if (app.ispContactName) {
      topIspContacts[app.ispContactName] = (topIspContacts[app.ispContactName] || 0) + 1;
    }
    if (app.agency && app.agency !== 'N/A') {
      topReferrers[app.agency] = (topReferrers[app.agency] || 0) + 1;
    }
  }
  
  const formatForChart = (data: Record<string, number>) => {
      return Object.entries(data)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value);
  }
  
  // Create a sorted list of months for the chart
  const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const sortedMonthly = Object.entries(monthly)
    .map(([month, total]) => ({ month, total }))
    .sort((a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month));


  return {
    byMcp: formatForChart(byMcp),
    byPathway: formatForChart(byPathway),
    byCounty: formatForChart(byCounty),
    monthly: sortedMonthly,
    topIspContacts: formatForChart(topIspContacts),
    topReferrers: formatForChart(topReferrers),
  };
};

export const statsData = calculateStats(applications);
