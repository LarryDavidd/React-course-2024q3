import React, { Component, ReactNode } from 'react';

type FormProps = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
};

class Form extends Component<FormProps> {
  render() {
    return (
      <form
        onSubmit={this.props.onSubmit}
        className="mx-auto max-w-md"
      >
        {this.props.children}
      </form>
    );
  }
}

export default Form;
