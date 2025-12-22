export type JobStatus = 'applied' | 'interview' | 'offer' | 'rejected';

export interface JobApplication {
  id: string;
  created_at: string;
  user_id: string;
  company: string;
  position: string;
  status: JobStatus;
  applied_date: string;
  salary: number | null;
  location: string | null;
  job_url: string | null;
  notes: string | null;
}

export interface NewJobApplication {
  company: string;
  position: string;
  status: JobStatus;
  applied_date: string;
  salary?: number | null;
  location?: string | null;
  job_url?: string | null;
  notes?: string | null;
}
