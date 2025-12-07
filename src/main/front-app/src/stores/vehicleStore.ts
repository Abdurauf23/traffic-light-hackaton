import { create } from 'zustand';
import { Vehicle, Direction } from '../types';
import { VEHICLE_COLORS } from '../constants/colors';

interface VehicleState {
  vehicles: Vehicle[];
  addVehicle: (intersectionId: string, approach: Direction) => void;
  removeVehicle: (id: string) => void;
  updateVehicle: (id: string, updates: Partial<Vehicle>) => void;
  clearAll: () => void;
  getVehiclesByIntersection: (intersectionId: string) => Vehicle[];
  countVehiclesByDirection: (intersectionId: string, direction: Direction) => number;
}

let vehicleIdCounter = 0;

export const useVehicleStore = create<VehicleState>((set, get) => ({
  vehicles: [],

  addVehicle: (intersectionId, approach) => {
    const id = `vehicle-${vehicleIdCounter++}`;
    const color = VEHICLE_COLORS[Math.floor(Math.random() * VEHICLE_COLORS.length)];

    // Calculate spawn position based on approach direction
    // Find existing vehicles in same lane to avoid spawning on top of them
    const existingVehicles = get().vehicles.filter(
      v => v.intersectionId === intersectionId && v.approach === approach
    );

    // Right-side driving: vehicles stay on the right side of the road
    // Lane offset from center (positive = right side for that direction)
    const LANE_OFFSET = 1.5;

    const baseSpawnPositions = {
      north: { x: -LANE_OFFSET, y: 0.5, z: -40 }, // North-bound on right (west side)
      south: { x: LANE_OFFSET, y: 0.5, z: 40 },   // South-bound on right (east side)
      east: { x: 40, y: 0.5, z: -LANE_OFFSET },   // East-bound on right (south side)
      west: { x: -40, y: 0.5, z: LANE_OFFSET },   // West-bound on right (north side)
    };

    let spawnPosition = { ...baseSpawnPositions[approach] };

    // Check if there are vehicles at spawn position, move back if needed
    if (existingVehicles.length > 0) {
      const vehicleSpacing = 5; // Minimum spacing between vehicles

      switch (approach) {
        case 'north':
          // Find the furthest back vehicle (most negative z)
          const minZ = Math.min(...existingVehicles.map(v => v.position.z));
          spawnPosition.z = Math.min(minZ - vehicleSpacing, baseSpawnPositions.north.z);
          break;
        case 'south':
          // Find the furthest back vehicle (most positive z)
          const maxZ = Math.max(...existingVehicles.map(v => v.position.z));
          spawnPosition.z = Math.max(maxZ + vehicleSpacing, baseSpawnPositions.south.z);
          break;
        case 'east':
          // Find the furthest back vehicle (most positive x)
          const maxX = Math.max(...existingVehicles.map(v => v.position.x));
          spawnPosition.x = Math.max(maxX + vehicleSpacing, baseSpawnPositions.east.x);
          break;
        case 'west':
          // Find the furthest back vehicle (most negative x)
          const minX = Math.min(...existingVehicles.map(v => v.position.x));
          spawnPosition.x = Math.min(minX - vehicleSpacing, baseSpawnPositions.west.x);
          break;
      }
    }

    const rotation = {
      north: 0,
      south: Math.PI,
      east: -Math.PI / 2,
      west: Math.PI / 2,
    }[approach];

    const newVehicle: Vehicle = {
      id,
      position: spawnPosition,
      rotation,
      speed: 5,
      intersectionId,
      approach,
      state: 'moving',
      color,
    };

    set((state) => ({
      vehicles: [...state.vehicles, newVehicle],
    }));
  },

  removeVehicle: (id) =>
    set((state) => ({
      vehicles: state.vehicles.filter((v) => v.id !== id),
    })),

  updateVehicle: (id, updates) =>
    set((state) => ({
      vehicles: state.vehicles.map((v) =>
        v.id === id ? { ...v, ...updates } : v
      ),
    })),

  clearAll: () => set({ vehicles: [] }),

  getVehiclesByIntersection: (intersectionId) =>
    get().vehicles.filter((v) => v.intersectionId === intersectionId),

  countVehiclesByDirection: (intersectionId, direction) =>
    get().vehicles.filter(
      (v) => v.intersectionId === intersectionId && v.approach === direction
    ).length,
}));
