import React, { Component, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Center } from "@react-three/drei";

import Shirt from "./Shirt";
import Backdrop from "./Backdrop";
import CameraRig from "./CameraRig";

// Manual lighting setup (replaces Environment to avoid CDN failures)
const ManualLighting = () => (
  <>
    <ambientLight intensity={0.6} />
    <directionalLight position={[5, 5, 5]} intensity={0.5} castShadow />
    <directionalLight position={[-5, 5, -5]} intensity={0.3} />
    <pointLight position={[0, 5, 0]} intensity={0.4} />
  </>
);

// Error boundary component for Environment
class EnvironmentErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <ManualLighting />;
    }

    return this.props.children;
  }
}

const SafeEnvironment = () => {
  return (
    <EnvironmentErrorBoundary>
      <Suspense fallback={<ManualLighting />}>
        <Environment preset="city" />
      </Suspense>
    </EnvironmentErrorBoundary>
  );
};

// Canvas Model
const CanvasModel = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 0], fov: 25 }}
      gl={{
        preserveDrawingBuffer: true,
      }}
      className="w-full max-w-full h-full transition-all ease-in"
    >
      {/* base ambient light */}
      <ambientLight intensity={0.5} />

      {/* environment with error handling - falls back to manual lighting if CDN fails */}
      <SafeEnvironment />

      {/* camera rig */}
      <CameraRig>
        {/* backdrop */}
        <Backdrop />

        {/* shirt */}
        <Center>
          <Shirt />
        </Center>
      </CameraRig>
    </Canvas>
  );
};

export default CanvasModel;
