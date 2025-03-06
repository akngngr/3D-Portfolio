import React, { Suspense, useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const Computers = ({ isMobile, scrollProgress }) => {

  /*
  This work is based on "Maiden's Tower" (https://sketchfab.com/3d-models/maidens-tower-37f24564b1c446e7b2e99d5ae635ceda) by Erbay Çelik (https://sketchfab.com/erbaycelik) licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
  */
  const computer = useLoader(GLTFLoader, "./hacker_room/scene.glb");
  const modelRef = useRef();

  useEffect(() => {
    let mixer;
    if (computer.animations.length) {
      mixer = new THREE.AnimationMixer(computer.scene);
      computer.animations.forEach((clip) => {
        const action = mixer.clipAction(clip);
        action.play();
      });
    }
    return () => mixer?.stopAllAction();
  }, [computer]);

  useFrame(() => {
    if (modelRef.current) {
      const targetRotation = THREE.MathUtils.degToRad(180 + scrollProgress * 360);
      if (Math.abs(modelRef.current.rotation.y - targetRotation) > 0.01) {
        modelRef.current.rotation.y = THREE.MathUtils.lerp(modelRef.current.rotation.y, targetRotation, 0.1);
      }
    }
  });

  const scale = useMemo(() => (isMobile ? 2 : 2), [isMobile]);

  return (
    <mesh ref={modelRef}>
      {computer?.scene && (
        <primitive
          object={computer.scene}
          scale={[scale, scale, scale]}
          position={isMobile ? [0, -15, 0] : [0, -15, 0]}
        />
      )}
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);
    const handleMediaQueryChange = (event) => setIsMobile(event.matches);
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Canvas
      shadows
      camera={{
        position: isMobile ? [15, -8, 35] : [15, -8, 35],
        fov: 60,
      }}
      gl={{
        preserveDrawingBuffer: true,
        powerPreference: "high-performance",
        antialias: true,
      }}
      className="-z-10"
    >
      <Suspense fallback={null}>
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        {/* Balanced Lighting */}
        <ambientLight intensity={0.05} />
        <hemisphereLight intensity={0.25} groundColor="#333" />
        <pointLight intensity={0} position={[5, 10, 5]} />
        <directionalLight
          intensity={1.5}
          position={[5, 10, 5]}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <Computers isMobile={isMobile} scrollProgress={scrollProgress} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
