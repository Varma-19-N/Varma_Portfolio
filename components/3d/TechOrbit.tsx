// FIX: Added a triple-slash directive to include type definitions for @react-three/fiber, which is required to use its custom JSX elements like `group` in TypeScript.
/// <reference types="@react-three/fiber" />
import React, { useRef, useState, useMemo, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import { inSphere } from 'maath/random';
import { Group } from 'three';

interface SkillProps {
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  position: [number, number, number];
}

const Skill: React.FC<SkillProps> = ({ name, icon: Icon, position }) => {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<Group>(null!);

  // Gentle bobbing animation for each icon
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0] * 10) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <Html
        transform
        occlude
        center
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        className="cursor-pointer"
        as="div"
      >
        <div 
          className={`w-20 h-20 md:w-24 md:h-24 bg-dark-bg/20 backdrop-blur-sm border border-cyan-glow/20 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out ${hovered ? 'scale-125 border-cyan-glow/80' : 'scale-100'}`}
          style={{ willChange: 'transform' }}
        >
           <Icon className={`w-10 h-10 md:w-12 md:h-12 transition-colors duration-300 ${hovered ? 'text-cyan-glow' : 'text-gray-300'}`} />
        </div>
      </Html>
      <Text
        position={[0, -0.8, 0]}
        fontSize={0.25}
        color="#00FFFF"
        anchorX="center"
        anchorY="middle"
        visible={hovered}
        material-toneMapped={false}
      >
        {name}
      </Text>
    </group>
  );
};


export const TechOrbit: React.FC<{ skills: { name: string; icon: React.FC<React.SVGProps<SVGSVGElement>> }[] }> = ({ skills }) => {
  const count = skills.length;
  const radius = 3.5;
  const groupRef = useRef<Group>(null);

  const points = useMemo(() => 
    new Float32Array(inSphere(new Float32Array(count * 3), { radius })), 
    [count, radius]
  );
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
      groupRef.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <Suspense fallback={null}>
        {skills.map((skill, i) => (
          <Skill 
            key={i} 
            name={skill.name}
            icon={skill.icon}
            position={[points[i*3], points[i*3+1], points[i*3+2]]} 
          />
        ))}
      </Suspense>
    </group>
  );
};