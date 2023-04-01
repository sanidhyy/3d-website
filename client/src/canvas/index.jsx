import React from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Center } from "@react-three/drei";

import Shirt from "./Shirt";
import Backdrop from "./Backdrop";
import CameraRig from "./CameraRig";

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
      {/* front light */}
      <ambientLight intensity={0.5} />

      {/* environment */}
      <Environment preset="city" />

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
