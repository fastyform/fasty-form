create type "public"."locales" as enum ('pl', 'en');

alter table roles
rename to user_data;

alter table "public"."user_data" alter column "locale" set default 'pl'::locales;

alter table "public"."user_data" alter column "locale" set data type locales using "locale"::locales;


set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$begin
  insert into public.user_data (user_id) values (new.id);
  return new;
end;$function$
;


