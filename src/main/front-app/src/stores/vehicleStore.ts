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
    const spawnPositions = {
      north: { x: 0, y: 0.5, z: -40 },
      south: { x: 0, y: 0.5, z: 40 },
      east: { x: 40, y: 0.5, z: 0 },
      west: { x: -40, y: 0.5, z: 0 },
    };

    const rotation = {
      north: 0,
      south: Math.PI,
      east: -Math.PI / 2,
      west: Math.PI / 2,
    }[approach];

    const newVehicle: Vehicle = {
      id,
      position: spawnPositions[approach],
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
