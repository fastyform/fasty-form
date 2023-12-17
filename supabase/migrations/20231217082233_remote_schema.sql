create policy "Update profile picture vejz8c_0"
on "storage"."objects"
as permissive
for insert
to public
with check (((bucket_id = 'profile-images'::text) AND (name = ((auth.uid())::text || '.jpeg'::text))));


create policy "Update profile picture vejz8c_1"
on "storage"."objects"
as permissive
for select
to public
using (((bucket_id = 'profile-images'::text) AND (name = ((auth.uid())::text || '.jpeg'::text))));


create policy "Update profile picture vejz8c_2"
on "storage"."objects"
as permissive
for update
to public
using (((bucket_id = 'profile-images'::text) AND (name = ((auth.uid())::text || '.jpeg'::text))));


create policy "Update profile picture vejz8c_3"
on "storage"."objects"
as permissive
for delete
to public
using (((bucket_id = 'profile-images'::text) AND (name = ((auth.uid())::text || '.jpeg'::text))));



