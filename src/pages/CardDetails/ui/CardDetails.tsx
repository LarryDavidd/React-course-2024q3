import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSearchCardQuery } from '@/components/entities/Cards/api/cardApi';
import { Item } from '@/components/entities/Cards';
import { PageSpinner } from '@/components/shared/ui-kits/spinner';
import NotFoundSection from '@/components/shared/ui-kits/sections';
import { CloseButton } from '@/components/shared/ui-kits/buttons';
import { IResponse } from '@/components/shared/types/types';

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
