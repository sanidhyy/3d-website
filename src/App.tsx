import { Component, type ErrorInfo, type ReactNode } from "react";

import Canvas from "./canvas";
import Home from "./pages/Home";
import Customizer from "./pages/Customizer";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("App error boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="app transition-all ease-in flex items-center justify-center p-8">
          <p className="text-white text-center">
            Something went wrong loading the 3D view.
            {this.state.error?.message
              ? ` (${this.state.error.message})`
              : ""}{" "}
            Try refreshing the page.
          </p>
        </main>
      );
    }

    return this.props.children;
  }
}

// App
const App = () => {
  return (
    <ErrorBoundary>
      <main className="app transition-all ease-in">
        <Home />
        <Canvas />
        <Customizer />
      </main>
    </ErrorBoundary>
  );
};

export default App;
