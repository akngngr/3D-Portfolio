import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  OrbitControls,
  Preload,
  useGLTF,
  useAnimations,
} from "@react-three/drei";
import { useAnimationFrame } from "framer-motion";
import * as THREE from "three";


let mixer;

const Model = (props) => {

  const group = useRef()
  const { nodes, materials, animations } = useGLTF('hacker_room/scene.glb')
  const { actions, ref, mixer, names, clips } = useAnimations(animations, group)

    useEffect(() => {
        actions.play()

    }, [ actions, names])


  return (

    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, -0.873]}>
          <group name="bae1c0dddc9e4393ad68f712ef1cde76fbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="RootNode">
              <group name="arm">
                <mesh name="arm_arm_mat_0" geometry={nodes.arm_arm_mat_0.geometry} material={materials['arm_mat.001']} scale={0.02} position={[0.2, -2, 0]}  />
              </group>
              <group name="Cables">
                <mesh name="Cables_cables_mat_0" geometry={nodes.Cables_cables_mat_0.geometry} material={materials['cables_mat.001']} scale={0.02} position={[0.2, -2, 0]} />
              </group>
              <group name="computer">
                <mesh name="computer_computer_mat_0" geometry={nodes.computer_computer_mat_0.geometry} material={materials['computer_mat.001']} />
              </group>
              <group name="Ground">
                <mesh name="Ground_ground_mat_0" geometry={nodes.Ground_ground_mat_0.geometry} material={materials['ground_mat.001']} scale={0.02} position={[0.2, -2, 0]} />
              </group>
              <group name="keyboard_mat">
                <mesh name="keyboard_mat_mat_mat_0" geometry={nodes.keyboard_mat_mat_mat_0.geometry} material={materials['mat_mat.001']} scale={0.02} position={[0.2, -2, 0]} />
              </group>
              <group name="peripherals">
                <mesh name="peripherals_key_mat_0" geometry={nodes.peripherals_key_mat_0.geometry} material={materials['key_mat.001']} scale={0.02} position={[0.2, -2, 0]} />
              </group>
              <group name="props">
                <mesh name="props_props_mat_0" geometry={nodes.props_props_mat_0.geometry} material={materials['props_mat.001']} scale={0.02} position={[0.2, -2, 0]} />
              </group>
              <group name="screen">
                <mesh name="screen_screens_0" geometry={nodes.screen_screens_0.geometry} material={materials['screens.001']} scale={0.02} position={[0.2, -2, 0]} />
              </group>
              <group name="screen_glass">
                <mesh name="screen_glass_glass_0" geometry={nodes.screen_glass_glass_0.geometry} material={materials['glass.001']} scale={0.02} position={[0.2, -2, 0]} />
              </group>
              <group name="server">
                <mesh name="server_server_mat_0" geometry={nodes.server_server_mat_0.geometry} material={materials['server_mat.001']} scale={0.02} position={[0.2, -2, 0]} />
              </group>
              <group name="shelf">
                <mesh name="shelf_stand_mat_0" geometry={nodes.shelf_stand_mat_0.geometry} material={materials['stand_mat.001']} scale={0.02} position={[0.2, -2, 0]} />
              </group>
              <group name="table">
                <mesh name="table_table_mat_0" geometry={nodes.table_table_mat_0.geometry} material={materials['table_mat.001']} scale={0.02} position={[0.2, -2, 0]} />
              </group>
              <group name="Tv">
                <mesh name="Tv_tv_mat_0" geometry={nodes.Tv_tv_mat_0.geometry} material={materials['tv_mat.001']} scale={0.02} position={[0.2, -2, 0]} />
              </group>
              <group name="vhs">
                <mesh name="vhs_vhsPlayer_mat_0" geometry={nodes.vhs_vhsPlayer_mat_0.geometry} material={materials['vhsPlayer_mat.001']} scale={0.02} position={[0.2, -2, 0]} />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
};

// const Computers = ({ isMobile }) => {
  
//   /* This work is based on "Hacker Room - Stylized" (https://sketchfab.com/3d-models/hacker-room-stylized-a0cfe6edf2dd494c8a95addf6bb13a10) by david.campuzano (https://sketchfab.com/david.campuzano) licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)*/


const Desk = () => {
  return (
    <Canvas>
      <ambientLight intensity={1} />
      <Suspense fallback={null}>
        <OrbitControls
          onContextMenu={(event) => event.preventDefault()}
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Model />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default Desk;
