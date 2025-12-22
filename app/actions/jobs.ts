'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import type { NewJobApplication } from '@/types/database';

export async function createJob(
  prevState: { error?: string; success: boolean },
  formData: FormData
): Promise<{ error?: string; success: boolean }> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { error: 'You must be logged in', success: false };
    }

    const company = formData.get('company') as string;
    const position = formData.get('position') as string;
    const status = formData.get('status') as string;
    const applied_date = formData.get('applied_date') as string;
    const salary = formData.get('salary') as string;
    const location = formData.get('location') as string;
    const job_url = formData.get('job_url') as string;
    const notes = formData.get('notes') as string;

    if (!company || !position || !status || !applied_date) {
      return { error: 'Please fill in all required fields', success: false };
    }

    const jobData: NewJobApplication = {
      company,
      position,
      status: status as any,
      applied_date,
      salary: salary ? parseInt(salary) : undefined,
      location: location || undefined,
      job_url: job_url || undefined,
      notes: notes || undefined,
    };

    const { error: insertError } = await supabase
      .from('job_applications')
      .insert([{ ...jobData, user_id: user.id }]);

    if (insertError) {
      console.error('Insert error:', insertError);
      return { error: 'Failed to create job application', success: false };
    }

    revalidatePath('/dashboard');

    return { success: true };
  } catch (error) {
    console.error('Create job error:', error);
    return { error: 'An unexpected error occurred', success: false };
  }
}

export async function fetchJobs() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('job_applications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Fetch error:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Fetch jobs error:', error);
    return [];
  }
}

export async function updateJob(
  jobId: string,
  prevState: any,
  formData: FormData
) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { error: 'You must be logged in' };
    }

    const company = formData.get('company') as string;
    const position = formData.get('position') as string;
    const status = formData.get('status') as string;
    const applied_date = formData.get('applied_date') as string;
    const salary = formData.get('salary') as string;
    const location = formData.get('location') as string;
    const job_url = formData.get('job_url') as string;
    const notes = formData.get('notes') as string;

    if (!company || !position || !status || !applied_date) {
      return { error: 'Please fill in all required fields' };
    }

    const jobData = {
      company,
      position,
      status,
      applied_date,
      salary: salary ? parseInt(salary) : null,
      location: location || null,
      job_url: job_url || null,
      notes: notes || null,
    };

    const { error: updateError } = await supabase
      .from('job_applications')
      .update(jobData)
      .eq('id', jobId)
      .eq('user_id', user.id);

    if (updateError) {
      console.error('Update error:', updateError);
      return { error: 'Failed to update job application' };
    }

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Update job error:', error);
    return { error: 'An unexpected error occurred' };
  }
}

export async function deleteJob(jobId: string) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { error: 'You must be logged in' };
    }

    const { error: deleteError } = await supabase
      .from('job_applications')
      .delete()
      .eq('id', jobId)
      .eq('user_id', user.id);

    if (deleteError) {
      console.error('Delete error:', deleteError);
      return { error: 'Failed to delete job application' };
    }

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Delete job error:', error);
    return { error: 'An unexpected error occurred' };
  }
}

export async function fetchFilteredJobs(
  query: string = '',
  status: string = 'all'
) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return [];

    let queryBuilder = supabase
      .from('job_applications')
      .select('*')
      .eq('user_id', user.id);

    if (query) {
      queryBuilder = queryBuilder.or(
        `company.ilike.%${query}%,position.ilike.%${query}%`
      );
    }

    if (status !== 'all') {
      queryBuilder = queryBuilder.eq('status', status);
    }

    const { data, error } = await queryBuilder.order('created_at', {
      ascending: false,
    });

    if (error) {
      console.error('Fetch filtered error:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Fetch filtered jobs error:', error);
    return [];
  }
}

export async function fetchJobStats() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return {
        total: 0,
        applied: 0,
        interview: 0,
        offer: 0,
        rejected: 0,
      };
    }

    const { data, error } = await supabase
      .from('job_applications')
      .select('status')
      .eq('user_id', user.id);

    if (error || !data) {
      return {
        total: 0,
        applied: 0,
        interview: 0,
        offer: 0,
        rejected: 0,
      };
    }

    const stats = {
      total: data.length,
      applied: data.filter((j) => j.status === 'applied').length,
      interview: data.filter((j) => j.status === 'interview').length,
      offer: data.filter((j) => j.status === 'offer').length,
      rejected: data.filter((j) => j.status === 'rejected').length,
    };

    return stats;
  } catch (error) {
    console.error('Fetch stats error:', error);
    return {
      total: 0,
      applied: 0,
      interview: 0,
      offer: 0,
      rejected: 0,
    };
  }
}
