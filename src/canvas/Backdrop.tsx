import { useRef } from "react";
import { easing } from "maath";
import { useFrame } from "@react-three/fiber";
import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";
import { useSnapshot } from "valtio";

import state from "../store";

// Backdrop
const Backdrop = () => {
  const shadows = useRef(null);
  const snap = useSnapshot(state);

  // change position based on screen size
  useFrame((frameState, delta) => {
    // keep track of screen width
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;

    // set the initial position of the model
    let targetPosition: [number, number, number] = [-0.4, 0, 2];

    // make model responsive
    if (snap.intro) {
      if (isBreakpoint) targetPosition = [0, 0, 2];
      if (isMobile) targetPosition = [0, 0.2, 2.5];
    } else {
      if (isMobile) targetPosition = [0, 0, 2.5];
      else targetPosition = [0, 0, 2];
    }

    // set shadow camera position
    easing.damp3(frameState.camera.position, targetPosition, 0.25, delta);
  });

  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={60}
      alphaTest={0.85}
      scale={10}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.14]}
    >
      {/* top right light */}
      <RandomizedLight
        amount={4}
        radius={9}
        intensity={Math.PI * 0.55}
        ambient={0.25}
        position={[5, 5, -10]}
      />

      {/* right light */}
      <RandomizedLight
        amount={4}
        radius={5}
        intensity={Math.PI * 0.25}
        ambient={0.55}
        position={[-5, 5, -9]}
      />
    </AccumulativeShadows>
  );
};

export default Backdrop;
