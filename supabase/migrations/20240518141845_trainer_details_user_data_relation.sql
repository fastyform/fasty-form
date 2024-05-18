alter table "public"."trainers_details" add constraint "public_trainers_details_user_id_fkey" FOREIGN KEY (user_id) REFERENCES user_data(user_id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."trainers_details" validate constraint "public_trainers_details_user_id_fkey";


