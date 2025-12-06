import { TRAFFIC_LIGHT_COLORS } from '../../constants/colors';
import { useIntersectionStore } from '../../stores/intersectionStore';

interface TrafficLightProps {
  intersectionId: string;
  direction: 'north_south' | 'east_west';
  position: [number, number, number];
}

export function TrafficLight({ intersectionId, direction, position }: TrafficLightProps) {
  const getLightState = useIntersectionStore((s) => s.getLightState);
  const state = getLightState(intersectionId, direction);

  const getActiveColor = (lightColor: 'red' | 'yellow' | 'green'): string => {
    return state === lightColor ? TRAFFIC_LIGHT_COLORS[lightColor] : '#333333';
  };

  return (
    <group position={position}>
      {/* Pole */}
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 4]} />
        <meshStandardMaterial color="#2c3e50" />
      </mesh>

      {/* Light housing */}
      <mesh position={[0, 4.5, 0]}>
        <boxGeometry args={[0.6, 2, 0.4]} />
        <meshStandardMaterial color="#2c3e50" />
      </mesh>

      {/* Red light */}
      <mesh position={[0, 5.3, 0.21]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial
          color={getActiveColor('red')}
          emissive={state === 'red' ? TRAFFIC_LIGHT_COLORS.red : '#000000'}
          emissiveIntensity={state === 'red' ? 0.8 : 0}
        />
      </mesh>

      {/* Yellow light */}
      <mesh position={[0, 4.5, 0.21]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial
          color={getActiveColor('yellow')}
          emissive={state === 'yellow' ? TRAFFIC_LIGHT_COLORS.yellow : '#000000'}
          emissiveIntensity={state === 'yellow' ? 0.8 : 0}
        />
      </mesh>

      {/* Green light */}
      <mesh position={[0, 3.7, 0.21]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial
          color={getActiveColor('green')}
          emissive={state === 'green' ? TRAFFIC_LIGHT_COLORS.green : '#000000'}
          emissiveIntensity={state === 'green' ? 0.8 : 0}
        />
      </mesh>
    </group>
  );
}
