import { useFrame } from '@react-three/fiber';
import { Ground } from './Ground';
import { Road } from './Road';
import { Intersection } from './Intersection';
import { Vehicle } from './Vehicle';
import { useVehicleStore } from '../../stores/vehicleStore';
import { useIntersectionStore } from '../../stores/intersectionStore';
import { useConfigStore } from '../../stores/configStore';
import { trafficReporter } from '../../services/trafficReporter';

export function Scene() {
  const vehicles = useVehicleStore((s) => s.vehicles);
  const updateVehicle = useVehicleStore((s) => s.updateVehicle);
  const removeVehicle = useVehicleStore((s) => s.removeVehicle);
  const getLightState = useIntersectionStore((s) => s.getLightState);
  const intersectionCount = useConfigStore((s) => s.intersectionCount);

  useFrame((_, delta) => {
    // Update vehicle positions
    vehicles.forEach((vehicle) => {
      const direction = vehicle.approach;
      const lightState = getLightState(vehicle.intersectionId,
        direction === 'north' || direction === 'south' ? 'north_south' : 'east_west'
      );

      // Simple movement logic
      let newZ = vehicle.position.z;
      let newX = vehicle.position.x;

      // Check if should stop at red light
      const shouldStop = lightState === 'red' &&
        ((direction === 'north' && vehicle.position.z > -10 && vehicle.position.z < -5) ||
         (direction === 'south' && vehicle.position.z < 10 && vehicle.position.z > 5) ||
         (direction === 'east' && vehicle.position.x < 10 && vehicle.position.x > 5) ||
         (direction === 'west' && vehicle.position.x > -10 && vehicle.position.x < -5));

      if (!shouldStop) {
        const speed = vehicle.speed * delta;

        switch (direction) {
          case 'north':
            newZ += speed;
            break;
          case 'south':
            newZ -= speed;
            break;
          case 'east':
            newX -= speed;
            break;
          case 'west':
            newX += speed;
            break;
        }
      }

      updateVehicle(vehicle.id, {
        position: { ...vehicle.position, x: newX, z: newZ },
      });

      // Remove vehicle if it's far from intersection
      if (Math.abs(newX) > 50 || Math.abs(newZ) > 50) {
        removeVehicle(vehicle.id);
      }
    });

    // Report traffic to backend
    trafficReporter.reportIfNeeded();
  });

  return (
    <group>
      <Ground />
      <Road />

      {Array.from({ length: intersectionCount }, (_, i) => (
        <Intersection key={i} id={`intersection_${i + 1}`} />
      ))}

      {vehicles.map((vehicle) => (
        <Vehicle key={vehicle.id} vehicle={vehicle} />
      ))}
    </group>
  );
}
