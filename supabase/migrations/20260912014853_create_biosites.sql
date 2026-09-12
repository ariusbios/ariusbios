create table if not exists public.biosites (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  data jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.biosites enable row level security;

-- Página pública é lida por qualquer visitante (anon key), nunca escrita por eles.
-- Escrita/edição hoje é manual (dashboard SQL), até a Fase 2 (builder) existir.
create policy "biosites are publicly readable"
  on public.biosites
  for select
  to anon, authenticated
  using (true);
