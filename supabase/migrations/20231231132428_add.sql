alter table "public"."trainers_details" add column "profile_slug" text;

CREATE UNIQUE INDEX trainers_details_profile_slug_key ON public.trainers_details USING btree (profile_slug);

alter table "public"."trainers_details" add constraint "trainers_details_profile_slug_check" CHECK ((length(profile_slug) < 50)) not valid;

alter table "public"."trainers_details" validate constraint "trainers_details_profile_slug_check";

alter table "public"."trainers_details" add constraint "trainers_details_profile_slug_key" UNIQUE using index "trainers_details_profile_slug_key";


