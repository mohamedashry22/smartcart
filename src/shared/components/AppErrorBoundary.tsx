import type { ReactNode } from "react";
import React from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  message: string;
}

export class AppErrorBoundary extends React.Component<Props, State> {
  state: State = {
    hasError: false,
    message: "",
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("AppErrorBoundary caught an error", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, message: "" });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#f7f9fb] px-4 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Something went wrong</h1>
          <p className="max-w-md text-sm text-gray-600">{this.state.message || "Please refresh the page and try again."}</p>
          <button
            type="button"
            onClick={this.handleReset}
            className="rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-700"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
