This is a FastyForm (https://fastyform.com/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install and start supabase CLI (you need to have also docker running):</br>
[https://supabase.com/docs/guides/cli/getting-started?platform=npm#installing-the-supabase-cli](https://supabase.com/docs/guides/cli/getting-started?platform=npm#installing-the-supabase-cli)</br></br>

Add in supabase dashboard [http://localhost:54323/project/default/database/triggers](http://localhost:54323/project/default/database/triggers) trigger for users (auth) table, events: insert, after the event, choose function with name handle_new_user</br></br>

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

After you create account locally you have to go [http://localhost:54324](http://localhost:54324) and confirm email.</br></br>
For google auth to work you have to add .env in supabase directory, add:</br>
export GOOGLE_CLIENT_ID="x"</br>
export GOOGLE_SECRET="x"</br>
You can find them here [https://console.cloud.google.com/apis/credentials/oauthclient](https://console.cloud.google.com/apis/credentials/oauthclient) Testing OAuth FastyForm
Then source ./supabase/.env && supabase stop</br>
source ./supabase/.env && supabase start </br></br>

Add bucket with name 'profile-images' and public bucket option checked and also policy:</>
Allowed operation all checked</br>
and bucket_id = 'profile-images' AND name = auth.uid()::text || '.jpeg'</br></br>

If you want to do database migration (pushing local supabase changes to production) use before commit: </br>
1. supabase db diff -f file_name </br>
2. Test locally if there are no errors with supabase db reset </br>
3. Make normal git push flow</br></br>

If you want to pull database schema from production use:</br>
1.supabase db pull</br>
2.supabase db reset</br>

