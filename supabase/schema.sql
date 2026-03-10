create extension if not exists pgcrypto;

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  plan text not null default 'free' check (plan in ('free', 'pro', 'studio')),
  created_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists public.generations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  tool text not null check (tool in ('idea', 'ui', 'code', 'unity-script', 'gdd', 'ui-ux-plan', 'system-design', 'mvp-roadmap')),
  prompt text not null,
  result text not null,
  created_at timestamptz not null default timezone('utc'::text, now())
);

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
