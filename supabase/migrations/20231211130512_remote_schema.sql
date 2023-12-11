
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE EXTENSION IF NOT EXISTS "moddatetime" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE TYPE "public"."role" AS ENUM (
    'trainer',
    'client'
);

ALTER TYPE "public"."role" OWNER TO "postgres";

CREATE TYPE "public"."status" AS ENUM (
    'reviewed',
    'unreviewed',
    'paid',
    'paidout'
);

ALTER TYPE "public"."status" OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."delete_claim"("uid" "uuid", "claim" "text") RETURNS "text"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
    BEGIN
      IF NOT is_claims_admin() THEN
          RETURN 'error: access denied';
      ELSE        
        update auth.users set raw_app_meta_data = 
          raw_app_meta_data - claim where id = uid;
        return 'OK';
      END IF;
    END;
$$;

ALTER FUNCTION "public"."delete_claim"("uid" "uuid", "claim" "text") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."get_claim"("uid" "uuid", "claim" "text") RETURNS "jsonb"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
    DECLARE retval jsonb;
    BEGIN
      IF NOT is_claims_admin() THEN
          RETURN '{"error":"access denied"}'::jsonb;
      ELSE
        select coalesce(raw_app_meta_data->claim, null) from auth.users into retval where id = uid::uuid;
        return retval;
      END IF;
    END;
$$;

ALTER FUNCTION "public"."get_claim"("uid" "uuid", "claim" "text") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."get_claims"("uid" "uuid") RETURNS "jsonb"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
    DECLARE retval jsonb;
    BEGIN
      IF NOT is_claims_admin() THEN
          RETURN '{"error":"access denied"}'::jsonb;
      ELSE
        select raw_app_meta_data from auth.users into retval where id = uid::uuid;
        return retval;
      END IF;
    END;
$$;

ALTER FUNCTION "public"."get_claims"("uid" "uuid") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."get_my_claim"("claim" "text") RETURNS "jsonb"
    LANGUAGE "sql" STABLE
    AS $$
  select 
  	coalesce(nullif(current_setting('request.jwt.claims', true), '')::jsonb -> 'app_metadata' -> claim, null)
$$;

ALTER FUNCTION "public"."get_my_claim"("claim" "text") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."get_my_claims"() RETURNS "jsonb"
    LANGUAGE "sql" STABLE
    AS $$
  select 
  	coalesce(nullif(current_setting('request.jwt.claims', true), '')::jsonb -> 'app_metadata', '{}'::jsonb)::jsonb
$$;

ALTER FUNCTION "public"."get_my_claims"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
begin
  insert into public.roles (user_id) values (new.id);
  return new;
end;
$$;

ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."handle_role_update_to_trainer"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
begin
  -- Check if the role is being updated to 'trainer' from null
  if old.role is null and new.role = 'trainer' then
    -- Insert a row into trainers_details
    insert into public.trainers_details (user_id)
    values (new.user_id); -- only user_id is specified, others will use default values
  end if;
  return new;
end;
$$;

ALTER FUNCTION "public"."handle_role_update_to_trainer"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."is_claims_admin"() RETURNS boolean
    LANGUAGE "plpgsql"
    AS $$
  BEGIN
    IF session_user = 'authenticator' THEN
      --------------------------------------------
      -- To disallow any authenticated app users
      -- from editing claims, delete the following
      -- block of code and replace it with:
      -- RETURN FALSE;
      --------------------------------------------
      IF extract(epoch from now()) > coalesce((current_setting('request.jwt.claims', true)::jsonb)->>'exp', '0')::numeric THEN
        return false; -- jwt expired
      END IF;
      If current_setting('request.jwt.claims', true)::jsonb->>'role' = 'service_role' THEN
        RETURN true; -- service role users have admin rights
      END IF;
      IF coalesce((current_setting('request.jwt.claims', true)::jsonb)->'app_metadata'->'claims_admin', 'false')::bool THEN
        return true; -- user has claims_admin set to true
      ELSE
        return false; -- user does NOT have claims_admin set to true
      END IF;
      --------------------------------------------
      -- End of block 
      --------------------------------------------
    ELSE -- not a user session, probably being called from a trigger or something
      return true;
    END IF;
  END;
$$;

ALTER FUNCTION "public"."is_claims_admin"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."set_claim"("uid" "uuid", "claim" "text", "value" "jsonb") RETURNS "text"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
    BEGIN
      IF NOT is_claims_admin() THEN
          RETURN 'error: access denied';
      ELSE        
        update auth.users set raw_app_meta_data = 
          raw_app_meta_data || 
            json_build_object(claim, value)::jsonb where id = uid;
        return 'OK';
      END IF;
    END;
$$;

ALTER FUNCTION "public"."set_claim"("uid" "uuid", "claim" "text", "value" "jsonb") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."update_submission_status"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  IF NEW.trainer_review <> OLD.trainer_review THEN
    UPDATE submissions SET status = 'reviewed' WHERE id = NEW.id;
  END IF;
  RETURN NEW;
END;
$$;

ALTER FUNCTION "public"."update_submission_status"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."roles" (
    "user_id" "uuid" NOT NULL,
    "role" "public"."role"
);

ALTER TABLE "public"."roles" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."submissions" (
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "order_id" "text" NOT NULL,
    "client_id" "uuid",
    "trainer_id" "uuid" NOT NULL,
    "video_url" "text",
    "client_description" "text",
    "trainer_review" "text",
    "status" "public"."status" DEFAULT 'unreviewed'::"public"."status" NOT NULL,
    "thumbnail_url" "text",
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "price_in_grosz" bigint NOT NULL
);

ALTER TABLE "public"."submissions" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."trainers_details" (
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "profile_name" "text",
    "profile_image_url" "text",
    "is_onboarded" boolean DEFAULT false NOT NULL,
    "service_price" smallint,
    "stripe_account_id" "text",
    "is_onboarded_stripe" boolean DEFAULT false NOT NULL,
    "stripe_price_id" "text",
    CONSTRAINT "trainers_details_profile_name_check" CHECK (("length"("profile_name") < 30)),
    CONSTRAINT "trainers_details_service_price_check" CHECK (("service_price" < 10000))
);

ALTER TABLE "public"."trainers_details" OWNER TO "postgres";

ALTER TABLE ONLY "public"."roles"
    ADD CONSTRAINT "roles_pkey" PRIMARY KEY ("user_id");

ALTER TABLE ONLY "public"."submissions"
    ADD CONSTRAINT "submissions_id2_key" UNIQUE ("id");

ALTER TABLE ONLY "public"."submissions"
    ADD CONSTRAINT "submissions_order_id_key" UNIQUE ("order_id");

ALTER TABLE ONLY "public"."submissions"
    ADD CONSTRAINT "submissions_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."trainers_details"
    ADD CONSTRAINT "trainers_details_pkey" PRIMARY KEY ("user_id");

ALTER TABLE ONLY "public"."trainers_details"
    ADD CONSTRAINT "trainers_details_profile_image_url_key" UNIQUE ("profile_image_url");

ALTER TABLE ONLY "public"."trainers_details"
    ADD CONSTRAINT "trainers_details_stripe_account_id_key" UNIQUE ("stripe_account_id");

ALTER TABLE ONLY "public"."trainers_details"
    ADD CONSTRAINT "trainers_details_user_id_key" UNIQUE ("user_id");

CREATE OR REPLACE TRIGGER "handle_updated_at" BEFORE UPDATE ON "public"."submissions" FOR EACH ROW EXECUTE FUNCTION "extensions"."moddatetime"('updated_at');

CREATE OR REPLACE TRIGGER "trigger_role_update_to_trainer" AFTER UPDATE ON "public"."roles" FOR EACH ROW EXECUTE FUNCTION "public"."handle_role_update_to_trainer"();

CREATE OR REPLACE TRIGGER "update_submission_status_on_trainer_rewview_add" AFTER UPDATE ON "public"."submissions" FOR EACH ROW EXECUTE FUNCTION "public"."update_submission_status"();

ALTER TABLE ONLY "public"."roles"
    ADD CONSTRAINT "roles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."submissions"
    ADD CONSTRAINT "submissions_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."submissions"
    ADD CONSTRAINT "submissions_trainer_id_fkey" FOREIGN KEY ("trainer_id") REFERENCES "public"."trainers_details"("user_id") ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."trainers_details"
    ADD CONSTRAINT "trainers_details_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;

CREATE POLICY "Enable all access based on user_id" ON "public"."trainers_details" USING (("user_id" = "auth"."uid"()));

CREATE POLICY "Enable read access for all users" ON "public"."trainers_details" FOR SELECT USING (true);

CREATE POLICY "allow_client_to_read_his_submissions" ON "public"."submissions" FOR SELECT USING (("auth"."uid"() = "client_id"));

CREATE POLICY "allow_trainers_to_mange_his_submissions" ON "public"."submissions" USING (("auth"."uid"() = "trainer_id")) WITH CHECK ((("auth"."uid"() = "trainer_id") AND ("auth"."uid"() = "trainer_id")));

CREATE POLICY "allow_user_to_select_their_role" ON "public"."roles" FOR SELECT USING (("auth"."uid"() = "user_id"));

CREATE POLICY "allow_user_to_update_their_role" ON "public"."roles" FOR UPDATE USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));

ALTER TABLE "public"."roles" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."submissions" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."trainers_details" ENABLE ROW LEVEL SECURITY;

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON FUNCTION "public"."delete_claim"("uid" "uuid", "claim" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."delete_claim"("uid" "uuid", "claim" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."delete_claim"("uid" "uuid", "claim" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."get_claim"("uid" "uuid", "claim" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."get_claim"("uid" "uuid", "claim" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_claim"("uid" "uuid", "claim" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."get_claims"("uid" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."get_claims"("uid" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_claims"("uid" "uuid") TO "service_role";

GRANT ALL ON FUNCTION "public"."get_my_claim"("claim" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."get_my_claim"("claim" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_my_claim"("claim" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."get_my_claims"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_my_claims"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_my_claims"() TO "service_role";

GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";

GRANT ALL ON FUNCTION "public"."handle_role_update_to_trainer"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_role_update_to_trainer"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_role_update_to_trainer"() TO "service_role";

GRANT ALL ON FUNCTION "public"."is_claims_admin"() TO "anon";
GRANT ALL ON FUNCTION "public"."is_claims_admin"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_claims_admin"() TO "service_role";

GRANT ALL ON FUNCTION "public"."set_claim"("uid" "uuid", "claim" "text", "value" "jsonb") TO "anon";
GRANT ALL ON FUNCTION "public"."set_claim"("uid" "uuid", "claim" "text", "value" "jsonb") TO "authenticated";
GRANT ALL ON FUNCTION "public"."set_claim"("uid" "uuid", "claim" "text", "value" "jsonb") TO "service_role";

GRANT ALL ON FUNCTION "public"."update_submission_status"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_submission_status"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_submission_status"() TO "service_role";

GRANT ALL ON TABLE "public"."roles" TO "anon";
GRANT ALL ON TABLE "public"."roles" TO "authenticated";
GRANT ALL ON TABLE "public"."roles" TO "service_role";

GRANT ALL ON TABLE "public"."submissions" TO "anon";
GRANT ALL ON TABLE "public"."submissions" TO "authenticated";
GRANT ALL ON TABLE "public"."submissions" TO "service_role";

GRANT ALL ON TABLE "public"."trainers_details" TO "anon";
GRANT ALL ON TABLE "public"."trainers_details" TO "authenticated";
GRANT ALL ON TABLE "public"."trainers_details" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
