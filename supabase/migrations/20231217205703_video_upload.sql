alter table "public"."submissions" drop column "video_url";

alter table "public"."submissions" add column "video_key" text;

create policy "allow_client_update_submissions"
on "public"."submissions"
as permissive
for update
to public
using ((auth.uid() = client_id))
with check ((auth.uid() = client_id));



