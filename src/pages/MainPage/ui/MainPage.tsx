import useAppSelector from '@/app/store/hooks/useAppSelector';
import { MainHeader } from '@/widgets/MainHeader';
import { ImageInfoType } from '../model';

const MainPage: React.FC = () => {
  const { ReactHookForms } = useAppSelector((state) => state.formsSlice);

  return (
    <>
      <MainHeader />
      {ReactHookForms.map((formInfo, index) => (
        <div
          key={index}
          className="max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800"
        >
          <img
            className="rounded-t-lg"
            src={(formInfo.image as ImageInfoType).base64 ?? (formInfo.image as string) ?? ''}
          />
          <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{formInfo.name}</h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Age: {formInfo.age}</p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Gender: {formInfo.gender}</p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Email: {formInfo.email}</p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Location: {formInfo.country}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default MainPage;
