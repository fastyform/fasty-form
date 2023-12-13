import privacyPolicyData from './_utils/privacy-policy-data';

const PrivacyPolicyPage = () => (
  <>
    <h1 className="text-2xl font-bold">
      Polityka prywatności <span className="text-yellow-400">FastyForm</span>
    </h1>
    {Object.entries(privacyPolicyData).map(([title, descriptionPoints], index) => (
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

export default PrivacyPolicyPage;
