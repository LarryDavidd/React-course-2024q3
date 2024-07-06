import { Component, ReactNode } from 'react';

class ErrorBlock extends Component {
  render(): ReactNode {
    return (
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
          <div className="mx-auto max-w-screen-sm text-center">
            <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">Something's missing.</p>
          </div>
        </div>
      </section>
    );
  }
}

export default ErrorBlock;
