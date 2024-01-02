alter table "public"."trainers_details" drop constraint "trainers_details_service_price_check";

alter table "public"."trainers_details" drop column "service_price";

alter table "public"."trainers_details" add column "service_price_in_grosz" integer;

alter table "public"."trainers_details" add constraint "trainers_details_service_price_in_grosz_check" CHECK ((service_price_in_grosz < 100000)) not valid;

alter table "public"."trainers_details" validate constraint "trainers_details_service_price_in_grosz_check";


