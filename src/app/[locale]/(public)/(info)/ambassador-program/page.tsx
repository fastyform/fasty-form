import Constants from '@/utils/constants';
import ambassadorTosData from './utils';

const AmbassadorProgram = () => (
  <>
    <h1 className="text-2xl font-bold">
      Regulamin Programu Ambasadorskiego <span className="text-yellow-400">{Constants.APP_NAME}</span>
    </h1>
    {Object.entries(ambassadorTosData).map(([title, descriptionPoints], titleIndex) => (
      <div key={title} className="flex flex-col gap-5">
        <h2 className="text-2xl">
          {titleIndex + 1}. {title}
        </h2>
        {descriptionPoints.map((description, descriptionIndex) => (
          <p
            key={description}
            className="ml-5"
            dangerouslySetInnerHTML={{ __html: `${titleIndex + 1}.${descriptionIndex + 1}. ${description}` }}
          />
        ))}
      </div>
    ))}
  </>
);

export default AmbassadorProgram;
