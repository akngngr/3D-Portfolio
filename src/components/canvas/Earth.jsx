import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import * as THREE from "three";

const makeGlowTexture = () => {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  // soft radial falloff, no bright center; reads as blurred aurora light
  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );
  gradient.addColorStop(0, "rgba(255,255,255,0.85)");
  gradient.addColorStop(0.35, "rgba(255,255,255,0.38)");
  gradient.addColorStop(0.65, "rgba(255,255,255,0.12)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
};

const orbConfigs = [
  { radius: 1.0, speed: 0.1, phase: 0, color: "#34d399", size: 0.5 },
  { radius: 1.8, speed: 0.14, phase: 1.3, color: "#2dd4bf", size: 0.6 },
  { radius: 2.6, speed: 0.08, phase: 2.6, color: "#22c55e", size: 0.65 },
  { radius: 3.4, speed: 0.12, phase: 3.9, color: "#818cf8", size: 0.7 },
  { radius: 4.1, speed: 0.09, phase: 0.8, color: "#60a5fa", size: 0.75 },
  { radius: 4.8, speed: 0.13, phase: 2.1, color: "#34d399", size: 0.8 },
  { radius: 5.2, speed: 0.07, phase: 3.4, color: "#2dd4bf", size: 0.78 },
  { radius: 5.5, speed: 0.11, phase: 1.7, color: "#22c55e", size: 0.72 },
  { radius: 5.8, speed: 0.06, phase: 4.2, color: "#818cf8", size: 0.82 },
  { radius: 6.0, speed: 0.1, phase: 2.9, color: "#4ade80", size: 0.75 },
];

const Aurorasphere = () => {
  const orbsRef = useRef(
    orbConfigs.map((c) => ({
      ...c,
      tilt: Math.random() * Math.PI,
      bob: Math.random() * Math.PI * 2,
    }))
  );
  const haloRefs = useRef([]);
  const groupRef = useRef();
  const glowTexture = useMemo(makeGlowTexture, []);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;
    const t = state.clock.elapsedTime;
    group.rotation.y += delta * 0.04;

    orbsRef.current.forEach((orb, i) => {
      const halo = haloRefs.current[i];
      if (!halo) return;
      const a = orb.phase + t * orb.speed;
      const radius = orb.radius + Math.sin(t * 0.4 + orb.bob) * 0.3;
      // flattened ellipse: wide horizontally, shallow vertically so the band
      // reads like aurora lights across the background without clipping
      halo.position.set(
        Math.cos(a) * radius,
        Math.sin(a + orb.tilt) * radius * 0.24,
        Math.sin(a) * radius * 0.4
      );
      const pulse = 0.85 + 0.15 * Math.sin(t * 1.1 + orb.bob);
      halo.scale.setScalar(orb.size * 3.6 * pulse);
    });
  });

  return (
    <group ref={groupRef} rotation={[0.25, 0, 0.1]} scale={0.8}>
      {orbsRef.current.map((orb, i) => (
        <group key={i}>
          <sprite ref={(el) => (haloRefs.current[i] = el)}>
            <spriteMaterial
              map={glowTexture}
              color={orb.color}
              transparent
              opacity={0.9}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </sprite>
        </group>
      ))}
    </group>
  );
};

const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="always"
      gl={{ preserveDrawingBuffer: true, powerPreference: "low-power" }}
      dpr={[1, 1.5]}
      camera={{
        fov: 42,
        near: 0.1,
        far: 200,
        position: [-5.5, 3.5, 8],
      }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <pointLight position={[65, 85, 10]} intensity={0.9} color="#4ade80" />
        <pointLight position={[-60, -40, -10]} intensity={0.5} color="#2dd4bf" />
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.35}
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Aurorasphere />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;