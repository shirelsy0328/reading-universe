-- Theory Desk / READING.UNIVERSE books table
-- Run once in Supabase Dashboard → SQL Editor, or via: npm run db:setup

create table if not exists public.books (
  id text primary key,
  title text not null,
  author text not null,
  cover_url text not null,
  rating numeric(4, 1) not null default 0,
  status text not null check (status in ('reading', 'archived', 'want-to-read')),
  progress text,
  quote text,
  thoughts text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists books_status_idx on public.books (status);
create index if not exists books_sort_order_idx on public.books (sort_order);

alter table public.books enable row level security;

drop policy if exists "books_public_read" on public.books;
create policy "books_public_read"
  on public.books
  for select
  using (true);

-- Writes are handled server-side (service role bypasses RLS).
-- Fallback policies for anon key during local development:
drop policy if exists "books_public_insert" on public.books;
drop policy if exists "books_public_update" on public.books;
drop policy if exists "books_public_delete" on public.books;

create policy "books_public_insert"
  on public.books
  for insert
  with check (true);

create policy "books_public_update"
  on public.books
  for update
  using (true)
  with check (true);

create policy "books_public_delete"
  on public.books
  for delete
  using (true);

create or replace function public.set_books_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists books_updated_at on public.books;
create trigger books_updated_at
  before update on public.books
  for each row
  execute function public.set_books_updated_at();
