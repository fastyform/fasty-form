import Constants from '@/utils/constants';
import { IntlShape } from '@/utils/types';
import MailTemplate from './mail-template';

const WelcomeMailTrainer = ({ t }: { t: IntlShape }) => (
  <MailTemplate title="Witamy na pokładzie, Trenerze!">
    <MailTemplate.CallToAction href={`${Constants.ORIGIN_URL}/submissions`}>
      {t('MAIL_TEMPLATE_WELCOME_TRAINER_CTA')}
    </MailTemplate.CallToAction>
    <MailTemplate.LineBreak />
    {t.rich('MAIL_TEMPLATE_WELCOME_TRAINER_CONTENT_1')}
    <MailTemplate.LineBreak />
    {t('MAIL_TEMPLATE_WELCOME_TRAINER_CONTENT_2')}
    <MailTemplate.LineBreak />
    {t('MAIL_TEMPLATE_WELCOME_TRAINER_CONTENT_3')}
    <MailTemplate.Greetings t={t} />
  </MailTemplate>
);

export default WelcomeMailTrainer;
