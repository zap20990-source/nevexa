"use client";

import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  ContactShadows,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { RotateCcw, ZoomIn, ZoomOut } from "lucide-react";

function Model({ type = "figure" }: { type?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
  });

  const color = type === "abstract" ? "#3b82f6" : "#6366f1";
  const emissive = type === "abstract" ? "#1d4ed8" : "#4f46e5";

  return (
    <mesh ref={meshRef} scale={[1.8, 1.8, 1.8]}>
      {type === "figure" && (
        <>
          {/* Cuerpo */}
          <cylinderGeometry args={[0.4, 0.6, 1.2, 32]} />
          {/* Cabeza */}
          <mesh position={[0, 0.85, 0]}>
            <sphereGeometry args={[0.35, 32, 32]} />
            <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={0.3} roughness={0.2} metalness={0.1} />
          </mesh>
          {/* Base */}
          <mesh position={[0, -0.7, 0]}>
            <torusGeometry args={[0.55, 0.08, 16, 32]} />
            <meshStandardMaterial color={color} roughness={0.3} metalness={0.3} />
          </mesh>
          <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
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
            <edgesGeometry args={[new THREE.IcosahedronGeometry(0.7, 1)]} />
            <lineBasicMaterial color="#93c5fd" transparent opacity={0.3} />
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
  className?: string;
}

export default function Product3DViewer({
  type = "figure",
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
          <span className="bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-full badge-3d">
            3D
          </span>
          <span className="bg-white/80 dark:bg-dark-card/80 backdrop-blur text-dark dark:text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
            Interactivo
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
            <directionalLight position={[-3, 2, -2]} intensity={0.4} />
            <pointLight position={[0, 2, 2]} intensity={0.3} color="#3b82f6" />
            <Model type={type} />
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
        <RotateCcw className="w-3 h-3" /> Arrastra para girar · Scroll para zoom
      </p>
    </div>
  );
}
