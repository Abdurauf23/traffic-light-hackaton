import { create } from 'zustand';
import { Config } from '../types';

interface ConfigState extends Config {
  setApiEndpoint: (endpoint: string) => void;
  setUpdateInterval: (seconds: number) => void;
  setIntersectionCount: (count: number) => void;
}

export const useConfigStore = create<ConfigState>((set) => ({
  apiEndpoint: '/api/traffic-update',
  updateIntervalSeconds: 10,
  intersectionCount: 1,

  setApiEndpoint: (endpoint) => set({ apiEndpoint: endpoint }),
  setUpdateInterval: (seconds) => set({ updateIntervalSeconds: seconds }),
  setIntersectionCount: (count) => set({ intersectionCount: count }),
}));
