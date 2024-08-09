import { Item } from '@/components/entities/Cards';
import { DEFAULT_PAGE } from '@/components/shared/constants/constats';
import { IResponse } from '@/components/shared/types/types';
import { CloseButton } from '@/components/shared/ui-kits/buttons';
import NotFoundSection from '@/components/shared/ui-kits/sections';
import Link from 'next/link';
import { useRouter } from 'next/router';

type CardDetailsProps = {
  data?: IResponse;
};

const CardDetails: React.FC<CardDetailsProps> = ({ data }) => {
  const router = useRouter();

  const { page, value } = router.query;

  const [newPage, newValue] = [page ?? DEFAULT_PAGE, value ?? ''];

  const renderItem = () => {
    if (data) {
      return (
        <div className="sticky top-0">
          <div className="relative flex">
            <Item character={data} />
            <Link
              href={`/?page=${newPage}&value=${newValue}`}
              className="absolute"
            >
              <CloseButton onClick={() => {}} />
            </Link>
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
