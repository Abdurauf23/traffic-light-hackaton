import { create } from 'zustand';
import { TrafficLight } from '../types';
import { PHYSICS } from '../constants/physics';

interface IntersectionState {
  lights: TrafficLight[];
  initializeIntersections: (count: number) => void;
  updateLightState: (id: string, state: 'red' | 'yellow' | 'green') => void;
  updateLightDurations: (intersectionId: string, northSouthGreen: number, eastWestGreen: number, yellow: number) => void;
  getLightsByIntersection: (intersectionId: string) => TrafficLight[];
  getLightState: (intersectionId: string, direction: 'north_south' | 'east_west') => 'red' | 'yellow' | 'green';
}

export const useIntersectionStore = create<IntersectionState>((set, get) => ({
  lights: [],

  initializeIntersections: (count) => {
    const lights: TrafficLight[] = [];

    for (let i = 0; i < count; i++) {
      const intersectionId = `intersection_${i + 1}`;

      lights.push({
        id: `${intersectionId}_north_south`,
        intersectionId,
        direction: 'north_south',
        state: 'green',
        greenDuration: PHYSICS.defaultGreenDuration,
        yellowDuration: PHYSICS.defaultYellowDuration,
        timeRemaining: PHYSICS.defaultGreenDuration,
      });

      lights.push({
        id: `${intersectionId}_east_west`,
        intersectionId,
        direction: 'east_west',
        state: 'red',
        greenDuration: PHYSICS.defaultGreenDuration,
        yellowDuration: PHYSICS.defaultYellowDuration,
        timeRemaining: 0,
      });
    }

    set({ lights });
  },

  updateLightState: (id, state) =>
    set((store) => ({
      lights: store.lights.map((light) =>
        light.id === id ? { ...light, state } : light
      ),
    })),

  updateLightDurations: (intersectionId, northSouthGreen, eastWestGreen, yellow) =>
    set((store) => ({
      lights: store.lights.map((light) => {
        if (light.intersectionId !== intersectionId) return light;

        return {
          ...light,
          greenDuration:
            light.direction === 'north_south' ? northSouthGreen : eastWestGreen,
          yellowDuration: yellow,
        };
      }),
    })),

  getLightsByIntersection: (intersectionId) =>
    get().lights.filter((light) => light.intersectionId === intersectionId),

  getLightState: (intersectionId, direction) => {
    const light = get().lights.find(
      (l) => l.intersectionId === intersectionId && l.direction === direction
    );
    return light?.state || 'red';
  },
}));
