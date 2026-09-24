import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Decal, Float, Preload, useTexture } from "@react-three/drei";

import { technologies } from "../../constants/constants";

const useColumns = () => {
  const [cols, setCols] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(max-width: 1024px)").matches
      ? 3
      : 6
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1024px)");
    const handleChange = (event) => setCols(event.matches ? 3 : 6);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  return cols;
};

const TechBall = ({ icon, ballScale }) => {
  const [decal] = useTexture([icon]);

  return (
    <Float speed={1.2} rotationIntensity={0.35} floatIntensity={1.6}>
      <mesh castShadow receiveShadow scale={ballScale}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#fff8eb"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          map={decal}
          rotation={[2 * Math.PI, 0, 6.25]}
          flatShading
        />
      </mesh>
    </Float>
  );
};

const TechCanvas = () => {
  const cols = useColumns();
  const isCompact = cols === 3;
  const rows = Math.ceil(technologies.length / cols);

  const layout = isCompact
    ? { spacingX: 5.2, spacingY: 4.8, ballScale: 2.2, z: 36, fov: 50 }
    : { spacingX: 5.6, spacingY: 5.4, ballScale: 2.3, z: 40, fov: 40 };

  return (
    <Canvas
      key={`${cols}-${layout.fov}`}
      camera={{ position: [0, 0, layout.z], fov: layout.fov }}
      gl={{ powerPreference: "low-power", antialias: true }}
      dpr={[1, 1.5]}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.35} />
        <directionalLight position={[5, 5, 10]} intensity={0.8} />
        {technologies.map((technology, index) => {
          const col = index % cols;
          const row = Math.floor(index / cols);
          const x = (col - (cols - 1) / 2) * layout.spacingX;
          const y = ((rows - 1) / 2 - row) * layout.spacingY;
          return (
            <group key={technology.name} position={[x, y, 0]}>
              <TechBall icon={technology.icon} ballScale={layout.ballScale} />
            </group>
          );
        })}
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default TechCanvas;