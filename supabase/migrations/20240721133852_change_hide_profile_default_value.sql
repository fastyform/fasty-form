alter table "public"."trainers_details" alter column "hide_profile" set default true;

UPDATE trainers_details
SET
  hide_profile = TRUE;
