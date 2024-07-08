import { Component } from 'react';

import { SimpleButton } from '@shared/ui-kits/buttons';

type ErrorButtonState = {
  isError: boolean;
};

export default class ErrorButton extends Component<object, ErrorButtonState> {
  constructor(props: object) {
    super(props);
    this.state = {
      isError: false
    };
  }

  throwError = () => {
    this.setState({ isError: true });
  };

  render() {
    const { isError } = this.state;

    if (isError) {
      throw new Error('Something went wrong!');
    }

    return (
      <SimpleButton
        onClick={this.throwError}
        buttonDetails={{ name: 'Error' }}
      />
    );
  }
}
