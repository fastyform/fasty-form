import { render } from '@react-email/render';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import { getQueryParamError } from '@/app/(auth)/_utils';
import Constants from '@/utils/constants';
import MailTemplate from '@/utils/mail/mail-template';
import { sendMail } from '@/utils/mail/send-mail';
import { getSupabaseServerClient } from '@/utils/supabase/client';
import { roleSchema } from '@/utils/validators';

const mailTexts = {
  client: [
    `Witaj w ${Constants.APP_NAME}! Zadbaj o swoją technikę już dziś.`,
    `Super, że jesteś z nami. W ${Constants.APP_NAME} czekają na Ciebie trenerzy gotowi przeanalizować Twoje wideo. Zajrzyj na ich profile, wybierz tego, który najbardziej Ci odpowiada, i zacznij swoją przygodę. Będziesz miał jakiekolwiek pytania - jesteśmy tu dla Ciebie. Powodzenia!`,
  ],
  trainer: [
    'Witamy na pokładzie, Trenerze!',
    `Cieszymy się, że dołączyłeś do naszego zespołu w ${Constants.APP_NAME}. Twoje doświadczenie i wiedza są dla nas na wagę złota. Sprawdź, jak łatwo zarządzać zapytaniami od klientów i dzielić się swoimi eksperckimi analizami techniki. Jakby coś, jesteśmy tu, aby Ci pomóc. Do dzieła!`,
  ],
};
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const role = searchParams.get('role');
  const redirectUrl = searchParams.get('redirectUrl');
  const marketing_consent = searchParams.get('marketing_consent') === 'true';

  const roleSchemaParsed = roleSchema.safeParse(role);

  if (!code || !roleSchemaParsed.success) {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }

  const { data: parsedRole } = roleSchemaParsed;

  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return redirect(`/register/${parsedRole}?${getQueryParamError('UNEXPECTED')}`);
  }

  const userId = data.user.id;

  // NOTE: Check if user is already registered and have assigned a role
  const roleResponse = await supabase.from('roles').select('role').eq('user_id', userId).single();

  if (roleResponse.error || !roleResponse.data) {
    await supabase.auth.signOut();

    return redirect(`/register/${parsedRole}?${getQueryParamError('UNEXPECTED')}`);
  }

  if (roleResponse.data.role !== null) {
    await supabase.auth.signOut();

    return redirect(`/register/${parsedRole}?${getQueryParamError('ALREADY_REGISTERED')}`);
  }

  const updateRoleResponse = await supabase
    .from('roles')
    .update({ role: parsedRole, marketing_consent })
    .eq('user_id', userId);

  if (updateRoleResponse.error) {
    await supabase.auth.signOut();

    return redirect(`/register/${parsedRole}?${getQueryParamError('UNEXPECTED')}`);
  }

  const [title, description] = mailTexts[parsedRole];

  await sendMail({
    to: data.user.email as string,
    subject: `Witaj w ${Constants.APP_NAME}!`,
    html: render(<MailTemplate title={title}>{description}</MailTemplate>),
  });

  return redirect(redirectUrl || '/submissions');
}
