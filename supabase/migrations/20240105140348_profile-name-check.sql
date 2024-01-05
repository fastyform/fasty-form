alter table "public"."trainers_details" drop constraint "trainers_details_profile_name_check";

alter table "public"."trainers_details" add constraint "trainers_details_profile_name_check" CHECK ((length(profile_name) < 50)) not valid;

alter table "public"."trainers_details" validate constraint "trainers_details_profile_name_check";


