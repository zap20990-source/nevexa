"use client";

import { Suspense, useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  ContactShadows,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { motion } from "framer-motion";
import { RotateCcw, ZoomIn, ZoomOut } from "lucide-react";

function GLTFModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.005;
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
    }
  });

  return <primitive ref={ref} object={scene} scale={[1.5, 1.5, 1.5]} />;
}

function STLModel({ url }: { url: string }) {
  const geometry = useLoader(STLLoader, url);
  const meshRef = useRef<THREE.Mesh>(null);

  const centeredGeometry = useMemo(() => {
    const geo = geometry.clone();
    geo.computeBoundingBox();
    const bb = geo.boundingBox;
    if (bb) {
      const cx = (bb.max.x + bb.min.x) / 2;
      const cy = (bb.max.y + bb.min.y) / 2;
      const cz = (bb.max.z + bb.min.z) / 2;
      geo.translate(-cx, -cy, -cz);
    }
    return geo;
  }, [geometry]);

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#e2e8f0",
        roughness: 0.25,
        metalness: 0.1,
        flatShading: false,
      }),
    []
  );

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} geometry={centeredGeometry} material={material} scale={[1.5, 1.5, 1.5]} />
  );
}

function DragonModel() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.008;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Body */}
      <mesh position={[0, 0.2, 0]}>
        <capsuleGeometry args={[0.3, 0.9, 8, 16]} />
        <meshStandardMaterial color="#c2410c" roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Neck */}
      <mesh position={[0, 0.5, 0.4]} rotation={[-0.4, 0, 0]}>
        <capsuleGeometry args={[0.12, 0.4, 6, 8]} />
        <meshStandardMaterial color="#c2410c" roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.5, 0.75]}>
        <capsuleGeometry args={[0.14, 0.25, 6, 8]} />
        <meshStandardMaterial color="#9a3412" roughness={0.2} metalness={0.15} />
      </mesh>
      {/* Snout */}
      <mesh position={[0, 0.45, 0.92]}>
        <coneGeometry args={[0.08, 0.2, 6]} />
        <meshStandardMaterial color="#7c2d12" roughness={0.2} metalness={0.1} />
      </mesh>
      {/* Eyes */}
      <mesh position={[0.08, 0.55, 0.78]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.8} roughness={0} />
      </mesh>
      <mesh position={[-0.08, 0.55, 0.78]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.8} roughness={0} />
      </mesh>
      {/* Horns */}
      <mesh position={[0.08, 0.65, 0.72]} rotation={[0.3, 0, 0.3]}>
        <coneGeometry args={[0.03, 0.15, 6]} />
        <meshStandardMaterial color="#fcd34d" roughness={0.2} />
      </mesh>
      <mesh position={[-0.08, 0.65, 0.72]} rotation={[0.3, 0, -0.3]}>
        <coneGeometry args={[0.03, 0.15, 6]} />
        <meshStandardMaterial color="#fcd34d" roughness={0.2} />
      </mesh>
      {/* Tail */}
      <mesh position={[0, 0.1, -0.6]} rotation={[0.5, 0, 0]}>
        <capsuleGeometry args={[0.08, 0.5, 6, 8]} />
        <meshStandardMaterial color="#c2410c" roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.1, -0.85]} rotation={[0.8, 0, 0]}>
        <coneGeometry args={[0.05, 0.25, 6]} />
        <meshStandardMaterial color="#7c2d12" roughness={0.2} />
      </mesh>
      {/* Wings */}
      <mesh position={[0.35, 0.3, 0]} rotation={[0, -0.2, -1.2]}>
        <capsuleGeometry args={[0.04, 0.7, 4, 4]} />
        <meshStandardMaterial color="#f97316" roughness={0.4} metalness={0.05} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[-0.35, 0.3, 0]} rotation={[0, 0.2, 1.2]}>
        <capsuleGeometry args={[0.04, 0.7, 4, 4]} />
        <meshStandardMaterial color="#f97316" roughness={0.4} metalness={0.05} side={THREE.DoubleSide} />
      </mesh>
      {/* Wing membrane right */}
      <mesh position={[0.3, 0.25, 0.05]} rotation={[0.1, 0, -0.6]}>
        <planeGeometry args={[0.5, 0.35]} />
        <meshStandardMaterial color="#fb923c" roughness={0.4} side={THREE.DoubleSide} transparent opacity={0.6} />
      </mesh>
      {/* Wing membrane left */}
      <mesh position={[-0.3, 0.25, 0.05]} rotation={[0.1, 0, 0.6]}>
        <planeGeometry args={[0.5, 0.35]} />
        <meshStandardMaterial color="#fb923c" roughness={0.4} side={THREE.DoubleSide} transparent opacity={0.6} />
      </mesh>
      {/* Legs */}
      {[[0.18, -0.1, 0.15], [-0.18, -0.1, 0.15], [0.15, -0.1, -0.3], [-0.15, -0.1, -0.3]].map((pos, i) => (
        <mesh key={i} position={pos as [number,number,number]}>
          <capsuleGeometry args={[0.05, 0.25, 4, 4]} />
          <meshStandardMaterial color="#7c2d12" roughness={0.2} />
        </mesh>
      ))}
      {/* Spikes along back */}
      {[-0.3, -0.1, 0.1, 0.3].map((z, i) => (
        <mesh key={`s${i}`} position={[0, 0.5, z]} rotation={[-0.3, 0, 0]}>
          <coneGeometry args={[0.04, 0.12, 4]} />
          <meshStandardMaterial color="#fcd34d" roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
}

function ProceduralModel({ type = "figure" }: { type?: string }) {
  if (type === "dragon") {
    return <DragonModel />;
  }
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
  });

  const color = type === "abstract" ? "#3b82f6" : "#6366f1";
  const emissive = type === "abstract" ? "#1d4ed8" : "#4f46e5";

  return (
    <mesh ref={meshRef} scale={[1.8, 1.8, 1.8]}>
      {type === "figure" && (
        <>
          <cylinderGeometry args={[0.4, 0.6, 1.2, 32]} />
          <mesh position={[0, 0.85, 0]}>
            <sphereGeometry args={[0.35, 32, 32]} />
            <meshStandardMaterial
              color={color}
              emissive={emissive}
              emissiveIntensity={0.3}
              roughness={0.2}
              metalness={0.1}
            />
          </mesh>
          <mesh position={[0, -0.7, 0]}>
            <torusGeometry args={[0.55, 0.08, 16, 32]} />
            <meshStandardMaterial
              color={color}
              roughness={0.3}
              metalness={0.3}
            />
          </mesh>
          <meshStandardMaterial
            color={color}
            roughness={0.3}
            metalness={0.2}
          />
        </>
      )}
      {type === "abstract" && (
        <>
          <icosahedronGeometry args={[0.7, 1]} />
          <meshStandardMaterial
            color={color}
            emissive={emissive}
            emissiveIntensity={0.2}
            roughness={0.15}
            metalness={0.4}
            wireframe={false}
          />
          <lineSegments>
            <edgesGeometry
              args={[new THREE.IcosahedronGeometry(0.7, 1)]}
            />
            <lineBasicMaterial
              color="#93c5fd"
              transparent
              opacity={0.3}
            />
          </lineSegments>
        </>
      )}
      {type === "geometric" && (
        <>
          <dodecahedronGeometry args={[0.6, 0]} />
          <meshStandardMaterial
            color="#8b5cf6"
            roughness={0.2}
            metalness={0.5}
            wireframe={false}
          />
        </>
      )}
    </mesh>
  );
}

function Model({
  modelUrl,
  type = "figure",
}: {
  modelUrl?: string;
  type?: string;
}) {
  if (modelUrl) {
    const isSTL = modelUrl.toLowerCase().endsWith(".stl");
    if (isSTL) {
      return (
        <Suspense
          fallback={
            <mesh>
              <sphereGeometry args={[0.5, 16, 16]} />
              <meshStandardMaterial color="#6366f1" wireframe />
            </mesh>
          }
        >
          <STLModel url={modelUrl} />
        </Suspense>
      );
    }
    return (
      <Suspense
        fallback={
          <mesh>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshStandardMaterial color="#3b82f6" wireframe />
          </mesh>
        }
      >
        <GLTFModel url={modelUrl} />
      </Suspense>
    );
  }
  return <ProceduralModel type={type} />;
}

function Grid() {
  return (
    <gridHelper
      args={[4, 20, "#e5e7eb", "#f3f4f6"]}
      position={[0, -1.5, 0]}
    />
  );
}

interface Product3DViewerProps {
  type?: string;
  modelUrl?: string;
  className?: string;
}

export default function Product3DViewer({
  type = "figure",
  modelUrl,
  className = "",
}: Product3DViewerProps) {
  const controlsRef = useRef<any>(null);
  const [autoRotate, setAutoRotate] = useState(true);

  const handleReset = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
      setAutoRotate(true);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900"
      >
        <div className="absolute top-3 left-3 z-10 flex gap-1.5">
          <span className="bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-full">
            3D
          </span>
          <span className="bg-white/80 dark:bg-dark-card/80 backdrop-blur text-dark dark:text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
            {modelUrl ? "Modelo real" : "Demostración"}
          </span>
        </div>

        <div className="absolute bottom-3 right-3 z-10 flex flex-col gap-1.5">
          <button
            onClick={handleReset}
            className="w-8 h-8 rounded-lg bg-white/80 dark:bg-dark-card/80 backdrop-blur flex items-center justify-center hover:bg-white transition-colors shadow-sm"
            title="Resetear vista"
          >
            <RotateCcw className="w-3.5 h-3.5 text-gray-600 dark:text-gray-300" />
          </button>
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`w-8 h-8 rounded-lg bg-white/80 dark:bg-dark-card/80 backdrop-blur flex items-center justify-center hover:bg-white transition-colors shadow-sm`}
            title={autoRotate ? "Pausar rotación" : "Reanudar rotación"}
          >
            {autoRotate ? (
              <ZoomIn className="w-3.5 h-3.5 text-gray-600 dark:text-gray-300" />
            ) : (
              <ZoomOut className="w-3.5 h-3.5 text-gray-600 dark:text-gray-300" />
            )}
          </button>
        </div>

        <Canvas
          style={{ cursor: "grab" }}
          onPointerDown={() => setAutoRotate(false)}
        >
          <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={[0, 0.5, 3.5]} />
            <ambientLight intensity={0.4} />
            <directionalLight
              position={[5, 5, 5]}
              intensity={0.8}
              castShadow
            />
            <directionalLight
              position={[-3, 2, -2]}
              intensity={0.4}
            />
            <pointLight
              position={[0, 2, 2]}
              intensity={0.3}
              color="#3b82f6"
            />
            <Model modelUrl={modelUrl} type={type} />
            <Grid />
            <ContactShadows
              position={[0, -1.5, 0]}
              opacity={0.3}
              scale={4}
              blur={2}
            />
            <OrbitControls
              ref={controlsRef}
              autoRotate={autoRotate}
              autoRotateSpeed={2}
              enableZoom={true}
              enablePan={false}
              minDistance={2}
              maxDistance={6}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 1.8}
            />
            <Environment preset="studio" />
          </Suspense>
        </Canvas>
      </motion.div>
      <p className="text-center text-xs text-gray-400 mt-2 flex items-center justify-center gap-1">
        <RotateCcw className="w-3 h-3" /> Arrastra para girar · Scroll para
        zoom
      </p>
    </div>
  );
}
