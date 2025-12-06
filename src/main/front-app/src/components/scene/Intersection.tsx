import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { TrafficLight } from './TrafficLight';
import { useIntersectionStore } from '../../stores/intersectionStore';

interface IntersectionProps {
  id: string;
}

export function Intersection({ id }: IntersectionProps) {
  const lights = useIntersectionStore((s) => s.getLightsByIntersection(id));
  const updateLightState = useIntersectionStore((s) => s.updateLightState);

  const phaseRef = useRef(0); // 0: NS green, 1: NS yellow, 2: EW green, 3: EW yellow
  const timerRef = useRef(0);

  useFrame((_, delta) => {
    timerRef.current += delta;

    const nsLight = lights.find((l) => l.direction === 'north_south');
    const ewLight = lights.find((l) => l.direction === 'east_west');

    if (!nsLight || !ewLight) return;

    // Simple traffic light cycling logic
    switch (phaseRef.current) {
      case 0: // NS green
        updateLightState(nsLight.id, 'green');
        updateLightState(ewLight.id, 'red');
        if (timerRef.current > nsLight.greenDuration) {
          timerRef.current = 0;
          phaseRef.current = 1;
        }
        break;

      case 1: // NS yellow
        updateLightState(nsLight.id, 'yellow');
        updateLightState(ewLight.id, 'red');
        if (timerRef.current > nsLight.yellowDuration) {
          timerRef.current = 0;
          phaseRef.current = 2;
        }
        break;

      case 2: // EW green
        updateLightState(nsLight.id, 'red');
        updateLightState(ewLight.id, 'green');
        if (timerRef.current > ewLight.greenDuration) {
          timerRef.current = 0;
          phaseRef.current = 3;
        }
        break;

      case 3: // EW yellow
        updateLightState(nsLight.id, 'red');
        updateLightState(ewLight.id, 'yellow');
        if (timerRef.current > ewLight.yellowDuration) {
          timerRef.current = 0;
          phaseRef.current = 0;
        }
        break;
    }
  });

  return (
    <group>
      {/* Traffic lights at each corner */}
      <TrafficLight intersectionId={id} direction="north_south" position={[-8, 0, -8]} />
      <TrafficLight intersectionId={id} direction="north_south" position={[8, 0, 8]} />
      <TrafficLight intersectionId={id} direction="east_west" position={[8, 0, -8]} />
      <TrafficLight intersectionId={id} direction="east_west" position={[-8, 0, 8]} />
    </group>
  );
}
