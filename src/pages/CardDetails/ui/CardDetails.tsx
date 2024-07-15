import { CardContext, CardContextType, Item } from '@entities/Cards';
import { PageSpinner } from '@shared/ui-kits/spinner';
import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NotFoundSection from '@/shared/ui-kits/sections';
import { CloseButton } from '@/shared/ui-kits/buttons';

const CardDetails: React.FC = () => {
  const context = useContext<CardContextType | undefined>(CardContext);
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    context?.requestSingleCardInfo(pathname);
  }, [pathname]);

  const renderItem = () => {
    if (context?.isSingleLoading) {
      return <PageSpinner />;
    }

    if (context?.singleRes) {
      return (
        <div className="sticky top-0">
          <div className="relative flex">
            <Item character={context.singleRes} />
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
