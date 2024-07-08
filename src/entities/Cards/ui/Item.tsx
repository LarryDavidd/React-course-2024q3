import { IResponse } from '@shared/types/types';
import { Component } from 'react';

type ItemProps = {
  character: IResponse;
};

class Item extends Component<ItemProps> {
  render() {
    return (
      <div className="max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
        <img
          className="rounded-t-lg"
          src={this.props.character.image}
        />
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{this.props.character.name}</h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Status: {this.props.character.status}</p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Gender: {this.props.character.gender}</p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Species: {this.props.character.species}</p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Location: {this.props.character.location.name}</p>
        </div>
      </div>
    );
  }
}

export default Item;
