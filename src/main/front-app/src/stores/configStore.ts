import { create } from 'zustand';
import { Config } from '../types';

interface ConfigState extends Config {
  lastUpdateTimestamp: number;
  setApiEndpoint: (endpoint: string) => void;
  setUpdateInterval: (seconds: number) => void;
  setIntersectionCount: (count: number) => void;
  setLastUpdateTimestamp: (timestamp: number) => void;
}

export const useConfigStore = create<ConfigState>((set) => ({
  apiEndpoint: '/api/traffic-update',
  updateIntervalSeconds: 60,
  intersectionCount: 1,
  lastUpdateTimestamp: Date.now(),

  setApiEndpoint: (endpoint) => set({ apiEndpoint: endpoint }),
  setUpdateInterval: (seconds) => set({ updateIntervalSeconds: seconds }),
  setIntersectionCount: (count) => set({ intersectionCount: count }),
  setLastUpdateTimestamp: (timestamp) => set({ lastUpdateTimestamp: timestamp }),
}));
