import Constants from '@/utils/constants';
import tosData from './_utils/tos-data';

const TermsOfServicePage = () => (
  <>
    <h1 className="text-2xl font-bold">
      Regulamin <span className="text-yellow-400">{Constants.APP_NAME}</span>
    </h1>

    <div className="flex flex-col gap-5">
      <h2 className="text-2xl">Definicje</h2>
      <p>
        <strong>Właściciele:</strong> Przemysław Paziewski oraz Kacper Zabielski
      </p>
      <p>
        <strong>Aplikacja:</strong> {Constants.APP_NAME}
      </p>
    </div>
    {Object.entries(tosData).map(([title, descriptionPoints], index) => (
      <div key={title} className="flex flex-col gap-5">
        <h2 className="text-2xl">
          {index + 1}. {title}
        </h2>
        {descriptionPoints.map((el, i) => (
          <p key={el} className="ml-5">
            {index + 1}.{i + 1}. {el}
          </p>
        ))}
      </div>
    ))}
  </>
);

export default TermsOfServicePage;
