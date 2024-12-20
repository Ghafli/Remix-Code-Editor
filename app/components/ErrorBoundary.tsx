import { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
      this.setState({errorInfo})
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            Oops! Something went wrong.
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {this.state.error?.message || "An unexpected error occurred."}
          </p>
            {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
              <details className="mt-4 text-left">
                 <summary>Show details</summary>
                 <pre className="text-xs p-2 rounded bg-gray-100 dark:bg-gray-900">
                   {this.state.errorInfo.componentStack}
                 </pre>
               </details>
            )}
        </div>
      );
    }

    return this.props.children;
  }
}