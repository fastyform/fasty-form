create or replace view "public"."ordered_submissions_client" with (security_invoker = on) as
SELECT
    submissions.created_at,
    submissions.updated_at,
    submissions.stripe_session_id,
    submissions.client_id,
    submissions.trainer_id,
    submissions.client_description,
    submissions.trainer_review,
    submissions.status,
    submissions.id,
    submissions.price_in_grosz,
    submissions.video_key
FROM
    submissions
ORDER BY
    CASE submissions.status
        WHEN 'paid'::status THEN 1
        ELSE NULL::integer
    END,
    submissions.created_at DESC;


create or replace view "public"."ordered_submissions_trainer" with (security_invoker = on) as
SELECT
    submissions.created_at,
    submissions.updated_at,
    submissions.stripe_session_id,
    submissions.client_id,
    submissions.trainer_id,
    submissions.client_description,
    submissions.trainer_review,
    submissions.status,
    submissions.id,
    submissions.price_in_grosz,
    submissions.video_key
FROM
    submissions
WHERE
    (submissions.status <> 'paid'::status)
ORDER BY
    CASE submissions.status
        WHEN 'unreviewed'::status THEN 1
        ELSE NULL::integer
    END,
    submissions.created_at DESC;
