'use client';

import { Item } from '@entities/Cards';
import { useSearchParams } from '@remix-run/react';
import { IResponse } from '@shared/types/types';
import { CloseButton } from '@shared/ui-kits/buttons';
import NotFoundSection from '@shared/ui-kits/sections';

type CardDetailsProps = {
  data?: IResponse;
};

const CardDetails: React.FC<CardDetailsProps> = ({ data }) => {
  // const router = useRouter();
  // const searchParams = useSearchParams();

  // const onRedirect = () => {
  //   const params = new URLSearchParams(searchParams.toString());

  //   router.push(`/?${params.toString()}`);
  // };

  const [searchParams, setSearchParams] = useSearchParams();

  const onRedirect = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete('details');
    setSearchParams(params);
  };

  const renderItem = () => {
    if (data) {
      return (
        <div className="sticky top-0">
          <div className="relative flex">
            <Item character={data} />
            <CloseButton onClick={onRedirect} />
          </div>
        </div>
      );
    } else {
      return <NotFoundSection />;
    }
  };

  return <aside className="w-1/2 flex-1">{renderItem()}</aside>;
};

export default CardDetails;
