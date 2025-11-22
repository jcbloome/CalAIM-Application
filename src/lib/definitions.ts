export type ApplicationStatus = 'In Progress' | 'Completed & Submitted' | 'Requires Revision' | 'Approved';

export type Application = {
  id: string;
  memberName: string;
  status: ApplicationStatus;
  lastUpdated: string; // or Date
  pathway: 'SNF Transition' | 'SNF Diversion';
  forms: FormStatus[];
  progress: number;
};

export type FormStatus = {
  name: string;
  status: 'Pending' | 'Completed';
  type: 'Form' | 'Upload';
  href: string;
  downloadHref?: string;
};

export type Acronym = {
  term: string;
  definition: string;
};

export type Activity = {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  details: string;
};
