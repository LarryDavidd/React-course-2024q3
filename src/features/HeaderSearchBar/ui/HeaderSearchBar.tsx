import React, { Component } from 'react';
import { BaseInput } from '@shared/ui-kits/input';
import { SimpleButton } from '@shared/ui-kits/buttons';
import { BaseForm } from '@shared/ui-kits/forms';

type SearchBarProps = {
  onSearch: (query: string) => void;
};

type SearchBarState = {
  query: string;
};

export default class SearchBar extends Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);
    this.state = {
      query: ''
    };
  }

  handleInputChange = (text: string) => {
    this.setState({ query: text });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.onSearch(this.state.query);
  };

  render() {
    return (
      <BaseForm onSubmit={this.handleSubmit}>
        <div className="flex gap-2">
          <BaseInput
            onChange={this.handleInputChange}
            inputDetails={{}}
          />
          <SimpleButton buttonDetails={{ name: 'search', type: 'submit' }} />
        </div>
      </BaseForm>
    );
  }
}
