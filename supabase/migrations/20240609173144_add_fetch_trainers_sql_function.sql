set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.fetch_trainers(start integer, stop integer, seed text, filters jsonb DEFAULT '{}'::jsonb, order_by text DEFAULT ''::text, order_dir text DEFAULT 'ASC'::text)
 RETURNS TABLE(user_id uuid, service_price_in_grosz integer, profile_name text, profile_image_url text, profile_slug text)
 LANGUAGE plpgsql
AS $function$
DECLARE
    query_text TEXT;
BEGIN
    -- Construct the base query to get distinct user_ids
    query_text := 'WITH unique_trainers AS (
                      SELECT DISTINCT ON (user_id) user_id, service_price_in_grosz, profile_name, profile_image_url, profile_slug
                      FROM trainers_details
                      WHERE stripe_onboarding_status = ''verified''';

    -- Apply additional filters if provided
    IF filters <> '{}' THEN
        query_text := query_text || ' AND ' || filters || '::jsonb @> trainers_details.filters';
    END IF;

    query_text := query_text || ')';

    -- Apply additional ordering based on the specified order_by or random ordering
    IF order_by <> '' THEN
        query_text := query_text || ' SELECT * FROM unique_trainers ORDER BY ' || order_by || ' ' || order_dir || ', md5(user_id::text || ''' || seed || ''')';
    ELSE
        query_text := query_text || ' SELECT * FROM unique_trainers ORDER BY md5(user_id::text || ''' || seed || ''')';
    END IF;

    -- Apply pagination
    query_text := query_text || ' OFFSET ' || start || ' LIMIT ' || (stop - start + 1);

    -- Execute the dynamic query if the query text is not null
    IF query_text IS NOT NULL THEN
        RETURN QUERY EXECUTE query_text;
    END IF;

    -- If the query text is null, return an empty result set
    RETURN;
END;
$function$
;


