import { ReactNode } from 'react';

type ItemListProps = {
  children: ReactNode;
};

const ItemList: React.FC<ItemListProps> = ({ children }) => {
  return <div className="flex flex-wrap justify-center gap-24">{children}</div>;
};

export default ItemList;
