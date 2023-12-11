This is a FastyForm (https://fastyform.com/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install and start supabase CLI (you need to have also docker running):</br>
[https://supabase.com/docs/guides/cli/getting-started?platform=npm#installing-the-supabase-cli](https://supabase.com/docs/guides/cli/getting-started?platform=npm#installing-the-supabase-cli)</br></br>

Copy from your terminal your envs:</br>
SUPABASE_URL</br>
SUPABASE_ANON_KEY</br>
NEXT_PUBLIC_SUPABASE_URL</br>
NEXT_PUBLIC_SUPABASE_ANON_KEY</br>
SUPABASE_SERVICE_ROLE_KEY</br></br>

Get rest of the envs:</br>
NODEMAILER_PW</br>
NODEMAILER_EMAIL</br>
STRIPE_SECRET_KEY</br>

Install stripe CLI</br>
[https://stripe.com/docs/stripe-cli](https://stripe.com/docs/stripe-cli)</br></br>

Add last env:</br>
STRIPE_WEBHOOK_SECRET</br></br>

After you create account locally you have to add role in table manually, because of not ending emails. Same with trainer_details if you create trainer account.</br></br>

Add bucket with name 'profile-images' and public bucket option checked and also policy:</br>
Allowed operation all checked</br>
and bucket_id = 'profile-images' AND name = auth.uid()::text || '.jpeg'</br></br>

If you want to do database migration (pushing local supabase changes to production) use before commit: </br>
1. supabase db diff -f file_name </br>
2. Test locally if there are no errors with supabase db reset </br>
3. Make normal git push flow</br></br>

If you want to pull database schema from production use:</br>
1.supabase db pull</br>
2.supabase db reset</br>

