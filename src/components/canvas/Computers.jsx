import React, { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls, Preload, useProgress } from "@react-three/drei";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

// The top-right cloud in the model sits high on the right, right where the
// hero text is, and sweeps across it while the entrance rotation plays, so
// that node group is hidden once the scene loads.
const HIDDEN_SCENE_NODES = new Set(["pCube749", "pCube749_bulutlar_0"]);

const Computers = ({ isMobile, scrollProgress, ready }) => {
  /*
  This work is based on "Maiden's Tower" (https://sketchfab.com/3d-models/maidens-tower-37f24564b1c446e7b2e99d5ae635ceda) by Erbay Çelik (https://sketchfab.com/erbaycelik) licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
  */
  const computer = useLoader(GLTFLoader, "./hacker_room/scene.glb", (loader) => {
    const draco = new DRACOLoader().setDecoderPath("/draco/");
    loader.setDRACOLoader(draco);
  });
  const groupRef = useRef();

  useEffect(() => {
    computer.scene.traverse((child) => {
      if (HIDDEN_SCENE_NODES.has(child.name)) child.visible = false;
    });

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

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;
    const t = state.clock.elapsedTime;

    // Entrance: gracefully glide up and settle in (0 -> 1)
    group.userData.settle = THREE.MathUtils.damp(
      group.userData.settle ?? 0,
      ready ? 1 : 0,
      3.5,
      delta
    );
    const settle = group.userData.settle;
    // Narrow screens stack the hero text above the scene instead of beside it,
    // so the model sits lower and a little smaller to stay clear of the text.
    const baseY = isMobile ? -12.5 : -15;
    const baseScale = isMobile ? 1.75 : 2;

    // Scroll: an elegant quarter-turn + subtle tilt that only plays while the
    // hero is leaving the viewport, not a full 360° spin across the page.
    group.rotation.y = THREE.MathUtils.damp(
      group.rotation.y,
      THREE.MathUtils.degToRad(180 + scrollProgress * 60),
      2.5,
      delta
    );
    group.rotation.x = THREE.MathUtils.damp(
      group.rotation.x,
      THREE.MathUtils.degToRad(scrollProgress * 4),
      2.5,
      delta
    );

    // Idle life: a soft float and micro-sway so it never feels static
    group.position.x = Math.sin(t * 0.5) * 0.15;
    group.position.y =
      baseY - (1 - settle) * 3 + Math.sin(t * 1.2) * 0.12 + scrollProgress * 1.2;
    group.scale.setScalar(baseScale * (0.92 + 0.08 * settle));
  });

  return (
    <group ref={groupRef}>
      {computer?.scene && <primitive object={computer.scene} />}
    </group>
  );
};

// The Canvas camera prop is only read when the camera is created, so mobile
// framing is applied imperatively. The two sailboats sit 27 world units apart,
// while a portrait phone's frame is only ~0.52x the camera distance wide, so
// holding both plus a centred tower would need ~57 units and shrink the model
// to half size. Mobile instead sits back at 44 units on a narrower 46deg lens,
// aimed high so the whole scene drops down the frame: the island base falls
// out of shot entirely, the clouds settle to the lower edge of the hero text
// instead of sitting in it, and the tower (world x ~-2.3) stays centred with
// the near sailboat and rowboat in frame. Desktop uses a matching, more
// frontal angle (8deg versus 23deg before) at the same distance, aimed at the
// tower's own axis so the model stays centred on screen, with the left
// sailboat and rowboat sitting lower-left at 74-82% of the screen height,
// well below the hero text.
const CameraRig = ({ isMobile }) => {
  const camera = useThree((state) => state.camera);
  const controls = useThree((state) => state.controls);

  useEffect(() => {
    if (isMobile) {
      camera.position.set(2, -8, 44);
      camera.fov = 46;
      controls?.target.set(-0.2, 2, 0);
    } else {
      camera.position.set(3, -8, 38);
      camera.fov = 60;
      controls?.target.set(-2.3, 1, 0);
    }
    camera.updateProjectionMatrix();
    controls?.update();
  }, [camera, controls, isMobile]);

  return null;
};

const ComputersCanvas = () => {
  const { active } = useProgress();
  const [isMobile, setIsMobile] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    setIsMobile(mediaQuery.matches);
    const handleMediaQueryChange = (event) => setIsMobile(event.matches);
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Hero-scoped progress: 0 at page top, 1 after one viewport of scroll.
      const progress = Math.min(Math.max(window.scrollY / window.innerHeight, 0), 1);
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`absolute inset-0 transition-opacity duration-700 ${
        active ? "opacity-0" : "opacity-100"
      }`}
    >
      <Canvas
        shadows
        camera={{
          position: [15, -8, 35],
          fov: 60,
          near: 0.1,
          far: 200,
        }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.0;
        }}
        gl={{
          preserveDrawingBuffer: true,
          powerPreference: "low-power",
          antialias: true,
        }}
        dpr={[1, 1.5]}
        className="-z-10"
      >
        <Suspense fallback={null}>
          <OrbitControls
            makeDefault
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
          />
          <CameraRig isMobile={isMobile} />
          {/* Dramatic lighting: a single concentrated key so most of the
              model falls naturally into shadow, with colored rim light only */}
          <ambientLight intensity={0.2} />
          {/* Key: narrow spotlight pools light on the model, giving contrast
              through falloff rather than brightening everything equally */}
          <spotLight
            intensity={1.6}
            angle={0.55}
            penumbra={0.6}
            decay={1}
            position={[10, 8, 8]}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-bias={-0.0004}
            color="#fff2e6"
          />
          {/* Cool fill just above black on the shadow side */}
          <directionalLight intensity={0.38} position={[-10, 3, 5]} color="#6a86d0" />
          {/* Low bounce lifting the dark lower section */}
          <directionalLight intensity={0.55} position={[0, -4, 6]} color="#8a9fd8" />
          {/* Warm rim carving the back edge */}
          <directionalLight
            intensity={0.7}
            position={[-4, 9, -14]}
            color="#ff9d56"
          />
          {/* Faint cool sky bounce so the base isn't total black */}
          <hemisphereLight intensity={0.18} color="#7d95d6" groundColor="#0c0e18" />
          <Computers
            isMobile={isMobile}
            scrollProgress={scrollProgress}
            ready={!active}
          />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default ComputersCanvas;