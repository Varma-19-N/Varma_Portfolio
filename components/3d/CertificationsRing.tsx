// FIX: Added a triple-slash directive to include type definitions for @react-three/fiber, which is required to use its custom JSX elements like `group` and `meshStandardMaterial` in TypeScript.
/// <reference types="@react-three/fiber" />
import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Plane, Text } from '@react-three/drei';
import * as THREE from 'three';
import { CERTIFICATIONS } from '../../constants';

// A single glassmorphic certification card
const Card: React.FC<{
  text: string;
  onHover: (hovered: boolean) => void;
}> = ({ text, onHover }) => {
  const groupRef = useRef<THREE.Group>(null!);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null!);
  const textRef = useRef<any>(null!);
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    window.open('https://www.linkedin.com/in/madan-gopal-varma-nandi/details/certifications/', '_blank');
  };

  useFrame((state) => {
    const delta = state.clock.getDelta();
    if (groupRef.current) {
      // Smooth animations for hover effect
      const targetScale = hovered ? 1.15 : 1;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 1 - Math.pow(0.01, delta));
      
      // Add pop-out effect on the Z-axis
      const targetZ = hovered ? 0.5 : 0;
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 1 - Math.pow(0.01, delta));

      if (materialRef.current) {
        const targetIntensity = hovered ? 0.7 : 0;
        materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(materialRef.current.emissiveIntensity, targetIntensity, 1 - Math.pow(0.01, delta));
      }
      if (textRef.current) {
        textRef.current.material.color.lerp(new THREE.Color(hovered ? '#00FFFF' : 'white'), 1 - Math.pow(0.01, delta));
      }
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        onHover(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        onHover(false);
        document.body.style.cursor = 'auto';
      }}
      onClick={handleClick}
    >
      <Plane args={[5, 8]}>
        <meshStandardMaterial
          ref={materialRef}
          color={'#6A0DAD'}
          emissive={'#00FFFF'}
          emissiveIntensity={0}
          transparent
          opacity={0.15}
          metalness={0.2}
          roughness={0.3}
          side={THREE.DoubleSide}
        />
      </Plane>
      <Text
        ref={textRef}
        position={[0, 0, 0.01]}
        fontSize={0.45}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={4.8}
        textAlign="center"
      >
        {text}
      </Text>
    </group>
  );
};


// Wrapper for each card to handle its own scrolling and looping
const CardScroller: React.FC<{
  text: string;
  index: number;
  totalWidth: number;
  cardWidthWithSpacing: number;
  isPaused: boolean;
  onHover: (hovered: boolean) => void;
}> = ({ text, index, totalWidth, cardWidthWithSpacing, isPaused, onHover }) => {
  const groupRef = useRef<THREE.Group>(null!);
  // Set initial position
  if (groupRef.current) {
    groupRef.current.position.setX(index * cardWidthWithSpacing - totalWidth / 2);
  }


  useFrame((_, delta) => {
    if (groupRef.current && !isPaused) {
      // Move left
      groupRef.current.position.x -= 0.8 * delta; // Scroll speed
      // Loop when fully off-screen
      if (groupRef.current.position.x < (-totalWidth / 2) - (cardWidthWithSpacing / 2) ) {
        groupRef.current.position.x += totalWidth;
      }
    }
  });

  return (
    <group ref={groupRef} position={[index * cardWidthWithSpacing - totalWidth / 2, 0, 0]}>
      <Card text={text} onHover={onHover} />
    </group>
  );
};

export const CertificationsRing: React.FC = () => {
  const [isAnyCardHovered, setIsAnyCardHovered] = useState(false);
  
  const cardWidth = 5;
  const spacing = 2.5;
  const cardWidthWithSpacing = cardWidth + spacing;
  const totalWidth = cardWidthWithSpacing * CERTIFICATIONS.length;

  return (
    <group>
      {CERTIFICATIONS.map((cert, index) => (
        <CardScroller
          key={index}
          index={index}
          text={cert}
          totalWidth={totalWidth}
          cardWidthWithSpacing={cardWidthWithSpacing}
          isPaused={isAnyCardHovered}
          onHover={setIsAnyCardHovered}
        />
      ))}
    </group>
  );
};