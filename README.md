# Job Application Tracker

A full-stack web application for tracking job applications during your job search. Built with Next.js 16, TypeScript, Supabase, and Tailwind CSS.

## Features

- **User Authentication** - Secure signup/login with email and password
- **Job Management** - Create, read, update, and delete job applications
- **Real-time Search** - Search applications by company or position
- **Status Filtering** - Filter by application status (Applied, Interview, Offer, Rejected)
- **Dashboard Statistics** - View application counts and status breakdown
- **Responsive Design** - Fully functional on desktop, tablet, and mobile
- **Data Persistence** - All data securely stored in Supabase PostgreSQL database

## Tech Stack

**Frontend:**

- [Next.js 16](https://nextjs.org/) - React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- React Hooks - State management and side effects

**Backend:**

- [Supabase](https://supabase.com/) - Backend as a Service
  - PostgreSQL database
  - Authentication
  - Row Level Security (RLS)
  - Real-time capabilities

## Architecture

This application demonstrates modern full-stack patterns:

- **Server Components** - Fetch data on the server for better performance
- **Server Actions** - Handle mutations (create/update/delete) without API routes
- **Client Components** - Interactive UI elements (forms, buttons, search)
- **Row Level Security** - Database-level security ensures users only access their own data
- **URL-based State** - Search and filter state in URL for shareability

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Supabase account (free tier works)
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/jwhite989/job-tracker.git
   cd job-tracker
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up Supabase**

   Create a new project at [supabase.com](https://supabase.com)

   Run this SQL in the Supabase SQL Editor:

   ```sql
   -- Create job_applications table
   create table job_applications (
     id uuid default gen_random_uuid() primary key,
     created_at timestamp with time zone default timezone('utc'::text, now()) not null,
     user_id uuid references auth.users not null,
     company text not null,
     position text not null,
     status text not null,
     applied_date date not null,
     salary integer,
     location text,
     job_url text,
     notes text
   );

   -- Enable Row Level Security
   alter table job_applications enable row level security;

   -- Create policies
   create policy "Users can view own applications"
     on job_applications for select
     using (auth.uid() = user_id);

   create policy "Users can insert own applications"
     on job_applications for insert
     with check (auth.uid() = user_id);

   create policy "Users can update own applications"
     on job_applications for update
     using (auth.uid() = user_id);

   create policy "Users can delete own applications"
     on job_applications for delete
     using (auth.uid() = user_id);
   ```

4. **Configure environment variables**

   Create a `.env.local` file in the root directory:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-anon-key
   ```

   Get these values from: Supabase Dashboard → Project Settings → API

5. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Security

- **Authentication** - Powered by Supabase Auth with secure session management
- **Row Level Security** - Database policies ensure users can only access their own data
- **Type Safety** - TypeScript catches errors at compile time
- **Server-side Validation** - All mutations validated on the server

## Future Enhancements

- [ ] Email notifications for application reminders
- [ ] Application status timeline/history
- [ ] Resume/cover letter attachment storage
- [ ] Interview preparation notes
- [ ] Salary comparison charts
- [ ] Export data to CSV
- [ ] Dark mode toggle
