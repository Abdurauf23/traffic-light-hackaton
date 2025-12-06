import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { Vehicle as VehicleType } from '../../types';

interface VehicleProps {
  vehicle: VehicleType;
}

export function Vehicle({ vehicle }: VehicleProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.set(
        vehicle.position.x,
        vehicle.position.y,
        vehicle.position.z
      );
      meshRef.current.rotation.y = vehicle.rotation;
    }
  });

  return (
    <mesh ref={meshRef} castShadow>
      <boxGeometry args={[2, 1, 4]} />
      <meshStandardMaterial color={vehicle.color} />
    </mesh>
  );
}
