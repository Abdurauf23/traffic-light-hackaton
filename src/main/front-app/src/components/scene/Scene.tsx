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
    const SAFE_DISTANCE = 5; // Minimum distance to maintain from vehicle ahead
    const VEHICLE_LENGTH = 4; // Length of vehicle model
    const MIN_SAFE_GAP = SAFE_DISTANCE + VEHICLE_LENGTH; // Total gap needed

    // Update vehicle positions
    vehicles.forEach((vehicle) => {
      const direction = vehicle.approach;
      const lightState = getLightState(vehicle.intersectionId,
        direction === 'north' || direction === 'south' ? 'north_south' : 'east_west'
      );

      // Current position
      let newZ = vehicle.position.z;
      let newX = vehicle.position.x;

      // Check if should stop at red light
      const shouldStopAtLight = lightState === 'red' &&
        ((direction === 'north' && vehicle.position.z > -10 && vehicle.position.z < -5) ||
         (direction === 'south' && vehicle.position.z < 10 && vehicle.position.z > 5) ||
         (direction === 'east' && vehicle.position.x < 10 && vehicle.position.x > 5) ||
         (direction === 'west' && vehicle.position.x > -10 && vehicle.position.x < -5));

      // Find closest vehicle ahead in same lane
      let closestDistance = Infinity;
      let hasVehicleAhead = false;

      vehicles.forEach(ahead => {
        if (ahead.id === vehicle.id ||
            ahead.intersectionId !== vehicle.intersectionId ||
            ahead.approach !== direction) {
          return;
        }

        let distance = 0;
        let isAhead = false;

        switch (direction) {
          case 'north':
            // North moves in positive z direction
            if (ahead.position.z > vehicle.position.z) {
              distance = ahead.position.z - vehicle.position.z;
              isAhead = true;
            }
            break;
          case 'south':
            // South moves in negative z direction
            if (ahead.position.z < vehicle.position.z) {
              distance = vehicle.position.z - ahead.position.z;
              isAhead = true;
            }
            break;
          case 'east':
            // East moves in negative x direction
            if (ahead.position.x < vehicle.position.x) {
              distance = vehicle.position.x - ahead.position.x;
              isAhead = true;
            }
            break;
          case 'west':
            // West moves in positive x direction
            if (ahead.position.x > vehicle.position.x) {
              distance = ahead.position.x - vehicle.position.x;
              isAhead = true;
            }
            break;
        }

        if (isAhead && distance < closestDistance) {
          closestDistance = distance;
          hasVehicleAhead = true;
        }
      });

      // Determine if should stop
      const tooCloseToVehicleAhead = hasVehicleAhead && closestDistance < MIN_SAFE_GAP;
      const shouldStop = shouldStopAtLight || tooCloseToVehicleAhead;

      // Move vehicle if not stopped
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
        state: shouldStop ? 'waiting' : 'moving',
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
