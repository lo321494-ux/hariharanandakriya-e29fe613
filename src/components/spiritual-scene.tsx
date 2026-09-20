import { Float, Lightformer, Environment } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function SacredForm() {
  const group = useRef<THREE.Group>(null);
  const particles = useMemo(() => {
    const values = new Float32Array(72 * 3);
    for (let index = 0; index < 72; index += 1) {
      const angle = index * 2.399963;
      const radius = 2.2 + (index % 9) * 0.38;
      values[index * 3] = Math.cos(angle) * radius;
      values[index * 3 + 1] = Math.sin(angle * 1.7) * 2.8;
      values[index * 3 + 2] = Math.sin(angle) * radius - 2;
    }
    return values;
  }, []);

  useFrame((state, rawDelta) => {
    if (!group.current) return;
    const delta = Math.min(rawDelta, 0.05);
    group.current.rotation.y += delta * 0.075;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.06;
  });

  return (
    <group ref={group} rotation={[0.2, 0, 0.18]}>
      <Float speed={0.8} rotationIntensity={0.22} floatIntensity={0.42}>
        {[1.4, 1.9, 2.45, 3].map((radius, index) => (
          <mesh key={radius} rotation={[Math.PI / 2 + index * 0.38, index * 0.7, 0]}>
            <torusGeometry args={[radius, 0.024 + index * 0.007, 10, 112]} />
            <meshStandardMaterial
              color={index % 2 === 0 ? "#57d6c4" : "#ffd66b"}
              emissive={index % 2 === 0 ? "#219b9b" : "#e7a832"}
              emissiveIntensity={0.9}
              metalness={0.7}
              roughness={0.2}
              transparent
              opacity={0.82}
            />
          </mesh>
        ))}
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <octahedronGeometry args={[1.18, 0]} />
          <meshStandardMaterial color="#63d6ca" emissive="#168f93" emissiveIntensity={0.65} wireframe transparent opacity={0.52} />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[0.72, 3]} />
          <meshPhysicalMaterial
            color="#f6dfaa"
            emissive="#dba856"
            emissiveIntensity={0.5}
            transmission={0.62}
            thickness={1.4}
            roughness={0.2}
            transparent
            opacity={0.88}
          />
        </mesh>
      </Float>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#6ee7d8" size={0.045} transparent opacity={0.75} />
      </points>
    </group>
  );
}

export default function SpiritualScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
    >
      <ambientLight intensity={0.85} />
      <pointLight position={[2, 3, 5]} intensity={13} color="#f7c95e" />
      <pointLight position={[-3, -1, 4]} intensity={9} color="#45cbbb" />
      <SacredForm />
      <Environment>
        <Lightformer intensity={2} position={[0, 5, 2]} scale={[8, 8, 1]} />
        <Lightformer intensity={1.2} color="#55d7c4" position={[-5, 1, 0]} rotation-y={Math.PI / 2} scale={[12, 2, 1]} />
      </Environment>
    </Canvas>
  );
}