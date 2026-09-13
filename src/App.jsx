import React, { Component } from "react";

import Canvas from "./canvas";
import Home from "./pages/Home";
import Customizer from "./pages/Customizer";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
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
