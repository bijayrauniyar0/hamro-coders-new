import React, { Component as ReactComponent, ReactNode } from 'react';

import Icon from '../Icon';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends ReactComponent<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center bg-red-200 p-4">
          <p className="text-base text-red-600">Something went wrong</p>
          <Icon
            name="error_outline"
            className="flex items-center text-red-600"
          />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
