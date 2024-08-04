drop view if exists "public"."ordered_submissions_client";

drop view if exists "public"."ordered_submissions_trainer";

alter table "public"."submissions" alter column "status" drop default;

alter type "public"."status" rename to "status__old_version_to_be_dropped";

create type "public"."status" as enum ('reviewed', 'unreviewed', 'paid', 'paidout', 'new_video_request');

alter table "public"."submissions" alter column status type "public"."status" using status::text::"public"."status";

alter table "public"."submissions" alter column "status" set default 'unreviewed'::status;

drop type "public"."status__old_version_to_be_dropped";

alter table "public"."submissions" add column "new_video_request_description" text;

create or replace view "public"."ordered_submissions_client" with (security_invoker = on) as
SELECT submissions.created_at,
    submissions.updated_at,
    submissions.stripe_session_id,
    submissions.client_id,
    submissions.trainer_id,
    submissions.client_description,
    submissions.trainer_review,
    submissions.status,
    submissions.id,
    submissions.price_in_grosz,
    submissions.video_key,
    submissions.new_video_request_description
   FROM submissions
  ORDER BY
        CASE submissions.status
            WHEN 'new_video_request'::status THEN 1
            WHEN 'paid'::status THEN 2
            ELSE NULL::integer
        END, submissions.created_at DESC;


create or replace view "public"."ordered_submissions_trainer" with (security_invoker = on) as
SELECT submissions.created_at,
    submissions.updated_at,
    submissions.stripe_session_id,
    submissions.client_id,
    submissions.trainer_id,
    submissions.client_description,
    submissions.trainer_review,
    submissions.status,
    submissions.id,
    submissions.price_in_grosz,
    submissions.video_key,
    submissions.new_video_request_description
   FROM submissions
  WHERE (submissions.status <> 'paid'::status)
  ORDER BY
        CASE submissions.status
            WHEN 'unreviewed'::status THEN 1
            ELSE NULL::integer
        END, submissions.created_at DESC;



