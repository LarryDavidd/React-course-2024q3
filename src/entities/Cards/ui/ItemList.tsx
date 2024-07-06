import { Component, ReactNode } from 'react';

type ItemListProps = {
  children: ReactNode;
};

class ItemList extends Component<ItemListProps> {
  render() {
    return <div className="flex flex-wrap justify-center gap-24">{this.props.children}</div>;
  }
}

export default ItemList;
