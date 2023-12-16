drop trigger if exists "trigger_role_update_to_trainer" on "public"."roles";

alter table "public"."submissions" add column "client_email" character varying;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.add_role_to_claims()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
 PERFORM set_claim(NEW.user_id::UUID, 'user_type'::TEXT, to_jsonb(NEW.role)::jsonb);
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_role_update_to_trainer()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
  -- Check if the role is being updated to 'trainer' from null
  if old.role is null and new.role = 'trainer' then
    -- Insert a row into trainers_details
    insert into public.trainers_details (user_id)
    values (new.user_id); -- only user_id is specified, others will use default values
  end if;
  return new;
end;
$function$
;

CREATE TRIGGER trigger_role_update_to_trainer_roles AFTER UPDATE ON public.roles FOR EACH ROW EXECUTE FUNCTION handle_role_update_to_trainer();


