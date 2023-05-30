import React, { Suspense, useEffect, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  OrbitControls,
  Preload,
  useGLTF,
  useAnimations,
} from "@react-three/drei";

import CanvasLoader from "../Loader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { scroll } from "framer-motion";

const gltfLoader = new GLTFLoader();

// Using Draco for compressed glb file - improves 3D loading.
// const dLoader = new DRACOLoader();
// dLoader.preload();
// dLoader.setDecoderPath(
//   "https://www.gstatic.com/draco/versioned/decoders/1.5.6/"
// );
// dLoader.setDecoderConfig({ type: "js" });
// gltfLoader.setDRACOLoader(dLoader);
// const renderer = new THREE.WebGLRenderer()


let mixer;

const Computers = ({ isMobile }) => {
  
  /* This work is based on "Hacker Room - Stylized" (https://sketchfab.com/3d-models/hacker-room-stylized-a0cfe6edf2dd494c8a95addf6bb13a10) by david.campuzano (https://sketchfab.com/david.campuzano) licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)*/

  const computer = useGLTF("./hacker_room/scene.glb");

  if (computer.animations.length) {
    mixer = new THREE.AnimationMixer(computer.scene);
    computer.animations.forEach((clip) => {
      const action = mixer.clipAction(clip);
      action.play();
    });
  }

  useFrame((state, delta) => {
    mixer?.update(delta);
  });

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <pointLight intensity={1} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={isMobile ? 512 : 1024}
      />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.02 : 0.03}
        position={isMobile ? [0.2, -2.25, 0] : [0.2, -2, 0]}
        rotation={[0.5, 3.5, 0.2]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Changes isMobile variable
  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the 'isMobile' state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);


  return (
    <Canvas
      shadows
      camera={{ position: [15, 3, 35], fov: `${isMobile ? 18 : 15}` }}
      gl={{ preserveDrawingBuffer: true, powerPreference: "high-performance" }}
      className="z-[-1]"
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          onContextMenu={(event) => event.preventDefault()}
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
