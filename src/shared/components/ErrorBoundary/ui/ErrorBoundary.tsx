import { Component, ErrorInfo, ReactNode } from 'react';
import ErrorBlock from '../components/ErrorBlock';

interface ErrorBoundaryState {
  hasError: boolean;
  error: undefined | string;
}

type ErrorBoundaryProps = {
  children?: ReactNode;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: undefined
    };
  }

  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      error: error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error);
    console.error(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorBlock />;
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
