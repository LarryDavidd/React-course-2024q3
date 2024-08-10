'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { IResponse, IResult } from '@shared/types/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { DEFAULT_PAGE } from '@shared/constants/constats';
import NotFoundSection from '@shared/ui-kits/sections';
import { MainHeader } from '@widgets/MainHeader';
import { Pagination } from '@shared/ui-kits/navigation';
import { Item, ItemList } from '@entities/Cards';

type MainPageProps = {
  data?: IResult;
  children?: ReactNode;
};

const MainPage: React.FC<MainPageProps> = ({ data, children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const changeUrl = (page: number) => {
    if (page > 1 && data && page < data?.info.pages) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', page.toString());

      router.push(pathname + '?' + params.toString());
    }
  };

  const numberOfPage = Number(searchParams.get('page')) || DEFAULT_PAGE;

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
                  href={`/${character.id}?${searchParams.toString()}`}
                  key={character.id}
                >
                  <Item character={character} />
                </Link>
              ))}
            </ItemList>
            {children ?? null}
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
