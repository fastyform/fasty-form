alter table "public"."submissions" drop constraint "submissions_client_id_fkey";

alter table "public"."submissions" drop constraint "submissions_trainer_id_fkey";

alter table "public"."submissions" alter column "trainer_id" drop not null;

alter table "public"."submissions" add constraint "submissions_client_id_fkey" FOREIGN KEY (client_id) REFERENCES auth.users(id) ON DELETE SET NULL not valid;

alter table "public"."submissions" validate constraint "submissions_client_id_fkey";

alter table "public"."submissions" add constraint "submissions_trainer_id_fkey" FOREIGN KEY (trainer_id) REFERENCES trainers_details(user_id) ON DELETE SET NULL not valid;

alter table "public"."submissions" validate constraint "submissions_trainer_id_fkey";


