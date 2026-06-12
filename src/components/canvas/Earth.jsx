import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';

import CanvasLoader from '../Loader';

const Earth = () => {
  const earth = useGLTF('./planet/abstract_shape.glb');

  return (
    <mesh>
      <spotLight
        position={[60, 80, 10]}
        angle={1}
        penumbra={0.5}
        intensity={0.5}
      />
      <hemisphereLight intensity={0.5} />
      <pointLight intensity={0.5} />
    <primitive 
      object={earth.scene}
      scale={1.5}
      position-y={0}
      rotation-y={0}
      />
      </mesh>
  )
}

const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop='demand'
      gl={{ preserveDrawingBuffer: true, powerPreference: "high-performance" }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6]
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth />
        
        <Preload all />
      </Suspense>
    </Canvas>
  )
}

export default EarthCanvas;