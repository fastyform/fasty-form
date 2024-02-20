alter table "public"."roles" add column "marketing_consent" boolean not null default false;

alter table "public"."trainers_details" add column "email" text;

alter table "public"."trainers_details" add column "onboarded_at" timestamp with time zone;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_role_update_to_trainer()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
declare
  user_email text;
begin
  -- Check if the role is being updated to 'trainer' from null
  if old.role is null and new.role = 'trainer' then
    -- Fetch the email from auth.users table
    select email into user_email from auth.users where id = new.user_id;
    
    -- Insert a row into trainers_details with user_id and email
    insert into public.trainers_details (user_id, email)
    values (new.user_id, user_email); -- Now includes email
  end if;
  return new;
end;
$function$
;


