'use client';

import React, { useMemo, useRef, useEffect, useState, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../contexts/ThemeContext';

function Globe({ impactTick, impactMix }: { impactTick: number; impactMix: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const glowLightRef = useRef<THREE.PointLight>(null);
  const fillLightRef = useRef<THREE.PointLight>(null);
  const impactStartedAtRef = useRef<number | null>(null);
  const blendedColor = useMemo(() => new THREE.Color('#3b82f6'), []);
  const fillColor = useMemo(() => new THREE.Color('#93c5fd'), []);
  const originColor = useMemo(() => new THREE.Color('#3b82f6'), []);
  const impactColor = useMemo(() => new THREE.Color('#f97316'), []);
  const originFillColor = useMemo(() => new THREE.Color('#93c5fd'), []);
  const impactFillColor = useMemo(() => new THREE.Color('#fdba74'), []);

  useFrame((state) => {
    if (
      groupRef.current &&
      coreRef.current &&
      shellRef.current &&
      atmosphereRef.current &&
      ringRef.current &&
      glowLightRef.current &&
      fillLightRef.current
    ) {
      const time = state.clock.elapsedTime;
      const idleFloat = Math.sin(time * 0.75) * 0.045;
      const impactElapsed =
        impactStartedAtRef.current === null ? null : (performance.now() - impactStartedAtRef.current) / 1000;
      const impactProgress = impactElapsed === null ? 0 : Math.min(impactElapsed / 1.45, 1);
      const impactEnvelope =
        impactElapsed === null
          ? 0
          : Math.exp(-impactElapsed * 3.7) * Math.sin(Math.min(impactElapsed * 11.5, Math.PI * 3.2));
      const recoilX = -impactEnvelope * 0.22;
      const recoilY = impactEnvelope * 0.08;
      const compressX = 1 - Math.max(impactEnvelope, 0) * 0.03;
      const stretchY = 1 + Math.max(impactEnvelope, 0) * 0.06;
      const stretchZ = 1 + Math.max(impactEnvelope, 0) * 0.035;
      const impactTilt = impactEnvelope * 0.11;
      const ringLift = Math.max(0, 1 - impactProgress) * 0.18;

      groupRef.current.position.x = recoilX;
      groupRef.current.position.y = idleFloat + recoilY;
      groupRef.current.rotation.x = impactTilt * 0.28;
      groupRef.current.rotation.z = Math.sin(time * 1.4) * 0.026 + impactTilt;
      groupRef.current.scale.set(compressX, stretchY, stretchZ);

      coreRef.current.rotation.y += 0.0045;
      shellRef.current.rotation.y -= 0.0035 + Math.max(impactEnvelope, 0) * 0.02;
      shellRef.current.rotation.z += 0.0012 + Math.max(impactEnvelope, 0) * 0.008;
      atmosphereRef.current.rotation.y += 0.002 + Math.max(impactEnvelope, 0) * 0.004;
      ringRef.current.rotation.z += 0.0025 + Math.max(impactEnvelope, 0) * 0.018;
      ringRef.current.position.y = ringLift * Math.exp(-Math.max(impactElapsed ?? 0, 0) * 2.4);

      blendedColor.lerpColors(originColor, impactColor, impactMix);
      fillColor.lerpColors(originFillColor, impactFillColor, impactMix);

      const coreMaterial = coreRef.current.material as THREE.MeshStandardMaterial;
      const shellMaterial = shellRef.current.material as THREE.MeshStandardMaterial;
      const atmosphereMaterial = atmosphereRef.current.material as THREE.MeshStandardMaterial;
      const ringMaterial = ringRef.current.material as THREE.MeshStandardMaterial;
      const flashBoost = Math.max(impactEnvelope, 0) * 0.42;

      coreMaterial.emissive.copy(blendedColor);
      coreMaterial.emissiveIntensity = 0.18 + flashBoost;
      shellMaterial.color.copy(blendedColor);
      shellMaterial.emissive.copy(blendedColor);
      shellMaterial.opacity = 0.3 + impactMix * 0.12 + flashBoost * 0.14;
      atmosphereMaterial.color.copy(blendedColor);
      atmosphereMaterial.emissive.copy(blendedColor);
      atmosphereMaterial.opacity = 0.08 + impactMix * 0.05 + flashBoost * 0.1;
      ringMaterial.color.copy(blendedColor);
      ringMaterial.emissive.copy(blendedColor);
      ringMaterial.opacity = 0.62 + impactMix * 0.12 + flashBoost * 0.16;

      glowLightRef.current.color.copy(blendedColor);
      glowLightRef.current.intensity = 5.1 + flashBoost * 6.5;
      fillLightRef.current.color.copy(fillColor);
      fillLightRef.current.intensity = 1.65 + flashBoost * 1.8;
    }
  });

  useEffect(() => {
    if (impactTick > 0) {
      impactStartedAtRef.current = performance.now();
    }
  }, [impactTick]);

  return (
    <group ref={groupRef}>
      <Sphere ref={coreRef} args={[1.85, 42, 42]}>
        <meshStandardMaterial
          color="#07111f"
          emissive="#3b82f6"
          emissiveIntensity={0.18}
          roughness={0.15}
          metalness={0.9}
        />
      </Sphere>

      <Sphere ref={shellRef} args={[1.95, 30, 30]}>
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={0.35}
          wireframe
          transparent
          opacity={0.38}
        />
      </Sphere>

      <Sphere ref={atmosphereRef} args={[2.18, 26, 26]}>
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={0.12}
          transparent
          opacity={0.1}
        />
      </Sphere>

      <mesh ref={ringRef} rotation={[1.15, 0.3, 0]}>
        <torusGeometry args={[2.55, 0.03, 12, 96]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={0.6}
          transparent
          opacity={0.8}
        />
      </mesh>

      <pointLight ref={glowLightRef} color="#3b82f6" intensity={5.1} distance={10} />
      <pointLight ref={fillLightRef} color="#93c5fd" intensity={1.65} distance={16} position={[0, 0, 4]} />
    </group>
  );
}

function Asteroid({
  launchedAt,
  flightDuration,
  onCollision,
}: {
  launchedAt: number;
  flightDuration: number;
  onCollision: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const trailRefs = useRef<THREE.Mesh[]>([]);
  const [hasCollided, setHasCollided] = useState(false);
  const trailOffsets = useMemo(() => [0.34, 0.7, 1.06, 1.42], []);
  const startPosition = useMemo(() => new THREE.Vector3(7.8, 2.35, 2.9), []);
  const endPosition = useMemo(() => new THREE.Vector3(0.4, 0.15, 0.25), []);
  const currentPosition = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    if (groupRef.current && !hasCollided) {
      const elapsed = performance.now() - launchedAt;
      const progress = Math.min(elapsed / flightDuration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 2.2);
      const wobble = Math.sin(state.clock.elapsedTime * 6.4) * (1 - progress) * 0.08;
      const depthDrift = Math.cos(state.clock.elapsedTime * 5.2) * (1 - progress) * 0.06;
      currentPosition.copy(startPosition).lerp(endPosition, easedProgress);

      const newX = currentPosition.x;
      const newY = currentPosition.y + wobble;
      const newZ = currentPosition.z + depthDrift;

      groupRef.current.position.set(newX, newY, newZ);
      groupRef.current.rotation.x += 0.028;
      groupRef.current.rotation.y += 0.045;

      trailRefs.current.forEach((mesh, index) => {
        const offset = trailOffsets[index];
        const trailX = newX + offset * 0.9;
        const trailY = newY + offset * 0.1;
        const trailZ = newZ + offset * 0.26;
        mesh.position.set(trailX, trailY, trailZ);
      });

      if (progress >= 1 && !hasCollided) {
        setHasCollided(true);
        onCollision();
      }
    }
  });

  if (hasCollided) return null;

  return (
    <group>
      {trailOffsets.map((offset, index) => (
        <mesh
          key={offset}
          ref={(node) => {
            if (node) trailRefs.current[index] = node;
          }}
        >
          <sphereGeometry args={[0.18 - index * 0.025, 12, 12]} />
          <meshStandardMaterial
            color="#fb923c"
            emissive="#f97316"
            emissiveIntensity={0.65 - index * 0.09}
            transparent
            opacity={0.5 - index * 0.07}
          />
        </mesh>
      ))}

      <group ref={groupRef}>
        <mesh>
          <icosahedronGeometry args={[0.42, 1]} />
          <meshStandardMaterial color="#c2410c" roughness={0.75} metalness={0.2} />
        </mesh>
        <mesh scale={1.35}>
          <sphereGeometry args={[0.28, 16, 16]} />
          <meshStandardMaterial
            color="#fed7aa"
            emissive="#fb923c"
            emissiveIntensity={1.2}
            transparent
            opacity={0.35}
          />
        </mesh>
      </group>
    </group>
  );
}

function ExplosionParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  const startTimeRef = useRef<number | null>(null);
  const basePositions = useMemo(() => {
    const particleCount = 240;
    const positions = new Float32Array(particleCount * 3);
    const directions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const stride = i * 3;
      const angle = (i / particleCount) * Math.PI * 2;
      const vertical = (((i * 17.7) % 100) / 100 - 0.5) * 1.6;
      const radius = 0.16 + (((i * 11.3) % 100) / 100) * 0.45;
      const spread = 0.7 + (((i * 7.9) % 100) / 100) * 1.45;

      positions[stride] = Math.cos(angle) * radius;
      positions[stride + 1] = vertical * 0.4;
      positions[stride + 2] = Math.sin(angle) * radius;

      directions[stride] = Math.cos(angle) * spread;
      directions[stride + 1] = vertical * 0.7;
      directions[stride + 2] = Math.sin(angle) * spread;
    }

    return { positions, directions };
  }, []);

  useFrame((state) => {
    if (pointsRef.current && pointsRef.current.geometry) {
      if (startTimeRef.current === null) {
        startTimeRef.current = state.clock.elapsedTime;
      }

      const elapsed = state.clock.elapsedTime - startTimeRef.current;
      const progress = Math.min(elapsed / 1.55, 1);
      const eased = 1 - Math.pow(1 - progress, 2.3);
      const particlePositions = pointsRef.current.geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < particlePositions.length; i += 3) {
        particlePositions[i] = basePositions.positions[i] + basePositions.directions[i] * eased;
        particlePositions[i + 1] = basePositions.positions[i + 1] + basePositions.directions[i + 1] * eased;
        particlePositions[i + 2] = basePositions.positions[i + 2] + basePositions.directions[i + 2] * eased;
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      if (materialRef.current) {
        materialRef.current.opacity = 0.8 * (1 - progress);
        materialRef.current.size = 0.045 + progress * 0.02;
      }
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[basePositions.positions.slice(), 3]} />
      </bufferGeometry>
      <pointsMaterial ref={materialRef} size={0.045} color="#fb923c" transparent opacity={0.8} />
    </points>
  );
}

function ImpactWave() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      const scale = 1 + state.clock.elapsedTime * 1.2;
      ringRef.current.scale.setScalar(scale);
      const material = ringRef.current.material as THREE.MeshStandardMaterial;
      material.opacity = Math.max(0, 0.58 - state.clock.elapsedTime * 0.42);
    }
  });

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[1.8, 2.2, 64]} />
      <meshStandardMaterial color="#fb923c" transparent opacity={0.75} side={THREE.DoubleSide} />
    </mesh>
  );
}

interface GlobeSceneProps {
  impactMix?: number;
}

export default function GlobeScene({ impactMix: impactMixProp }: GlobeSceneProps) {
  const { impactMix: themeImpactMix, setIsThemeChanged } = useTheme();
  const impactMix = impactMixProp ?? themeImpactMix;
  const [showExplosion, setShowExplosion] = useState(false);
  const [showWave, setShowWave] = useState(false);
  const [impactTick, setImpactTick] = useState(0);
  const [launchStartedAt, setLaunchStartedAt] = useState<number | null>(null);
  const impactTriggeredRef = useRef(false);
  const timersRef = useRef<number[]>([]);
  const sceneLightColor = useMemo(() => {
    const blue = [59, 130, 246];
    const orange = [249, 115, 22];
    const mixed = blue.map((channel, index) =>
      Math.round(channel + (orange[index] - channel) * impactMix)
    );

    return `rgb(${mixed.join(', ')})`;
  }, [impactMix]);

  const impactAtMs = 10000;
  const flightDurationMs = 2400;
  const launchDelayMs = impactAtMs - flightDurationMs;

  useEffect(() => {
    impactTriggeredRef.current = false;

    const timer = window.setTimeout(() => {
      setLaunchStartedAt(performance.now());
    }, launchDelayMs);

    return () => {
      clearTimeout(timer);
      timersRef.current.forEach((timeout) => clearTimeout(timeout));
      timersRef.current = [];
    };
  }, [launchDelayMs]);

  const handleCollision = useCallback(() => {
    if (impactTriggeredRef.current) return;
    impactTriggeredRef.current = true;
    setShowExplosion(true);
    setShowWave(true);
    setImpactTick((value) => value + 1);
    setIsThemeChanged(true);

    timersRef.current.push(
      window.setTimeout(() => {
        setShowExplosion(false);
      }, 1900)
    );

    timersRef.current.push(
      window.setTimeout(() => {
        setShowWave(false);
      }, 1350)
    );

    timersRef.current.push(
      window.setTimeout(() => {
        setLaunchStartedAt(null);
      }, 1100)
    );
  }, [setIsThemeChanged]);

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0.2, 7.5], fov: 48 }}
        dpr={[1, 1.35]}
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
        style={{ background: 'transparent' }}
      >
        <fog attach="fog" args={['#020617', 8, 22]} />
        <ambientLight intensity={0.42} />
        <directionalLight position={[5, 4, 5]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-6, 2, 3]} intensity={2.1} color={sceneLightColor} />
        <Stars radius={80} depth={48} count={1400} factor={2.6} saturation={0} fade speed={0.28} />

        <Globe impactTick={impactTick} impactMix={impactMix} />
        {launchStartedAt !== null && (
          <Asteroid
            launchedAt={launchStartedAt}
            flightDuration={flightDurationMs}
            onCollision={handleCollision}
          />
        )}
        {showExplosion && <ExplosionParticles />}
        {showWave && <ImpactWave />}
      </Canvas>
    </div>
  );
}
