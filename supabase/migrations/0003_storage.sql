-- Landed — CV storage
-- A private bucket for CV uploads. Files are stored under a per-user folder
-- (`<auth.uid()>/<filename>`); `applications.cv_url` holds the object path.

insert into storage.buckets (id, name, public)
values ('cvs', 'cvs', false)
on conflict (id) do nothing;

-- Users can read/write/delete only files inside their own folder.
drop policy if exists "cvs: own files" on storage.objects;
create policy "cvs: own files" on storage.objects
  for all to authenticated
  using (
    bucket_id = 'cvs'
    and (storage.foldername(name))[1] = auth.uid()::text
  )
  with check (
    bucket_id = 'cvs'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
