create extension if not exists pgcrypto;

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  plan text not null default 'free' check (plan in ('free', 'pro', 'studio')),
  stripe_customer_id text,
  stripe_subscription_id text,
  subscription_status text default 'inactive',
  current_period_end timestamptz,
  created_at timestamptz not null default timezone('utc'::text, now())
);

alter table public.users add column if not exists stripe_customer_id text;
alter table public.users add column if not exists stripe_subscription_id text;
alter table public.users add column if not exists subscription_status text default 'inactive';
alter table public.users add column if not exists current_period_end timestamptz;

create table if not exists public.generations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  tool text not null check (tool in ('idea', 'ui', 'pixel-art', 'code', 'unity-script', 'gdd', 'ui-ux-plan', 'system-design', 'mvp-roadmap')),
  prompt text not null,
  result text not null,
  provider text,
  model text,
  prompt_tokens integer,
  completion_tokens integer,
  total_tokens integer,
  created_at timestamptz not null default timezone('utc'::text, now())
);

alter table public.generations add column if not exists provider text;
alter table public.generations add column if not exists model text;
alter table public.generations add column if not exists prompt_tokens integer;
alter table public.generations add column if not exists completion_tokens integer;
alter table public.generations add column if not exists total_tokens integer;

alter table public.users enable row level security;
alter table public.generations enable row level security;

create policy "Users can view own profile"
on public.users
for select
using (auth.uid() = id);

create policy "Users can update own profile"
on public.users
for update
using (auth.uid() = id);

create policy "Users can view own generations"
on public.generations
for select
using (auth.uid() = user_id);

create policy "Users can insert own generations"
on public.generations
for insert
with check (auth.uid() = user_id);
