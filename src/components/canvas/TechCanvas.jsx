import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Decal, Float, Preload, useCursor, useTexture } from "@react-three/drei";

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

const makeGlowTexture = () => {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  const grad = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );
  grad.addColorStop(0, "rgba(74,222,128,0.55)");
  grad.addColorStop(0.45, "rgba(34,197,94,0.22)");
  grad.addColorStop(1, "rgba(34,197,94,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
};

const TechBall = ({ icon, docs, ballScale }) => {
  const [decal] = useTexture([icon]);
  const [hovered, setHovered] = useState(false);
  const glowTexture = useMemo(makeGlowTexture, []);
  const meshRef = useRef();
  const glowRef = useRef();
  const matRef = useRef();
  // Pointer direction in mesh-local space, drives the follow-rotate on hover
  const pointer = useRef({ x: 0, y: 0 });
  useCursor(hovered);

  useFrame((_, delta) => {
    const a = 1 - Math.exp(-delta * 2.5);
    const targetScale = hovered ? ballScale * 1.12 : ballScale;
    meshRef.current.scale.setScalar(
      THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, a)
    );
    glowRef.current.material.opacity = THREE.MathUtils.lerp(
      glowRef.current.material.opacity,
      hovered ? 1 : 0,
      a
    );
    matRef.current.emissiveIntensity = THREE.MathUtils.lerp(
      matRef.current.emissiveIntensity,
      hovered ? 0.2 : 0,
      a
    );

    // Ease the ball to lean toward the pointer while hovered
    const tx = hovered ? pointer.current.x * 0.9 : 0;
    const ty = hovered ? -pointer.current.y * 0.9 : 0;
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      tx,
      a
    );
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      ty,
      a
    );
  });

  return (
    <Float speed={1.2} rotationIntensity={0.35} floatIntensity={1.6}>
      {/* soft green halo sitting behind the ball */}
      <sprite ref={glowRef} scale={ballScale * 2.6} position={[0, 0, -0.9]}>
        <spriteMaterial
          map={glowTexture}
          transparent
          opacity={0}
          depthWrite={false}
        />
      </sprite>
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        scale={ballScale}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
        onPointerMove={(e) => {
          const local = e.object.worldToLocal(e.point.clone());
          pointer.current = {
            x: THREE.MathUtils.clamp(local.x, -1, 1),
            y: THREE.MathUtils.clamp(local.y, -1, 1),
          };
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (docs) window.open(docs, "_blank", "noopener,noreferrer");
        }}
      >
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          ref={matRef}
          color="#fff8eb"
          emissive="#22c55e"
          emissiveIntensity={0}
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
              <TechBall
                icon={technology.icon}
                docs={technology.docs}
                ballScale={layout.ballScale}
              />
            </group>
          );
        })}
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default TechCanvas;