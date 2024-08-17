import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSearchCardQuery } from '@entities/Cards/api/cardApi';
import { Item } from '@entities/Cards';
import { PageSpinner } from '@shared/ui-kits/spinner';
import NotFoundSection from '@shared/ui-kits/sections';
import { CloseButton } from '@shared/ui-kits/buttons';
import { IResponse } from '@shared/types/types';

const CardDetails: React.FC = () => {
  const [cardInfo, setCardInfo] = useState<IResponse | null>(null);

  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  const { data, isError, isLoading } = useSearchCardQuery(pathname);

  useEffect(() => {
    if (data) setCardInfo(data);
  }, [data]);

  const renderItem = () => {
    if (isLoading) {
      return <PageSpinner />;
    }

    if (!isError && cardInfo) {
      return (
        <div className="sticky top-0">
          <div className="relative flex">
            <Item character={cardInfo} />
            <CloseButton onClick={closeItem} />
          </div>
        </div>
      );
    } else {
      return <NotFoundSection />;
    }
  };

  const closeItem = () => navigate(`/${search}`);

  return <aside className="w-1/2 flex-1">{renderItem()}</aside>;
};

export default CardDetails;
