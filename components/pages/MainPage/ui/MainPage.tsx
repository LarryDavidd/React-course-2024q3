import React, { ReactNode } from 'react';
import Link from 'next/link';
import { IResponse, IResult } from '@/components/shared/types/types';
import { useRouter } from 'next/router';
import { DEFAULT_PAGE } from '@/components/shared/constants/constats';
import NotFoundSection from '@/components/shared/ui-kits/sections';
import { MainHeader } from '@/components/widgets/MainHeader';
import { Pagination } from '@/components/shared/ui-kits/navigation';
import { Item, ItemList } from '@/components/entities/Cards';

// const myThunk = (inputValue: string, currentPage: number) => (dispatch: Dispatch) => {
//   dispatch(setSaveText(inputValue));
//   dispatch(setCurrentPage(currentPage));
// };

type MainPageProps = {
  children: ReactNode;
  data?: IResult;
};

const MainPage: React.FC<MainPageProps> = ({ data, children }) => {
  const router = useRouter();

  const changeUrl = (page: number) => {
    const query = { ...router.query, page };
    router.push({
      pathname: router.pathname,
      query
    });
  };

  const { page } = router.query;
  const numberOfPage = Number(page) || DEFAULT_PAGE;

  const renderItems = () => {
    if (data) {
      return (
        <>
          <MainHeader />
          <div className="m-6 flex justify-center">
            <Pagination
              onClick={changeUrl}
              currentPage={numberOfPage}
            />
          </div>
          <main className="flex">
            <ItemList>
              {data.results.map((character: IResponse) => (
                <Link
                  href={`/${character.id}${router.asPath}`}
                  key={character.id}
                >
                  <Item character={character} />
                </Link>
              ))}
            </ItemList>
            {children}
          </main>
        </>
      );
    } else {
      return (
        <section>
          <NotFoundSection />
        </section>
      );
    }
  };

  return renderItems();
};

export default MainPage;
