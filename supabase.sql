-- Встав цей код у Supabase: SQL Editor -> New query -> Run

create table cartoons (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  cover_url text,
  tags text[] default '{}',
  created_at timestamptz default now()
);

create table episodes (
  id uuid primary key default gen_random_uuid(),
  cartoon_id uuid references cartoons(id) on delete cascade,
  number int not null,
  title text,
  video_url text not null,
  created_at timestamptz default now()
);

-- Читати може кожен, змінювати лише увійшовший адмін
alter table cartoons enable row level security;
alter table episodes enable row level security;
create policy "read cartoons" on cartoons for select using (true);
create policy "read episodes" on episodes for select using (true);
create policy "admin cartoons" on cartoons for all to authenticated using (true) with check (true);
create policy "admin episodes" on episodes for all to authenticated using (true) with check (true);

-- Сховища для файлів: обкладинки і відео
insert into storage.buckets (id, name, public) values ('covers', 'covers', true), ('videos', 'videos', true);
create policy "read files" on storage.objects for select using (bucket_id in ('covers', 'videos'));
create policy "upload files" on storage.objects for insert to authenticated with check (bucket_id in ('covers', 'videos'));
create policy "delete files" on storage.objects for delete to authenticated using (bucket_id in ('covers', 'videos'));
