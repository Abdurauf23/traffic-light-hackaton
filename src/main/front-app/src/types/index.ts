// Request payload (Frontend → Backend)
export interface TrafficUpdateRequest {
  timestamp: string;
  intersections: {
    [intersectionId: string]: {
      north: number;
      south: number;
      east: number;
      west: number;
    };
  };
}

// Response payload (Backend → Frontend)
export interface TrafficUpdateResponse {
  intersections: {
    [intersectionId: string]: {
      north_south_green: number;  // seconds
      east_west_green: number;    // seconds
      yellow: number;             // seconds
    };
  };
}

// Internal vehicle state
export interface Vehicle {
  id: string;
  position: { x: number; y: number; z: number };
  rotation: number;
  speed: number;
  intersectionId: string;
  approach: 'north' | 'south' | 'east' | 'west';
  state: 'moving' | 'waiting' | 'crossing';
  color: string;
}

// Traffic light state
export interface TrafficLight {
  id: string;
  intersectionId: string;
  direction: 'north_south' | 'east_west';
  state: 'red' | 'yellow' | 'green';
  greenDuration: number;
  yellowDuration: number;
  timeRemaining: number;
}

// Configuration
export interface Config {
  apiEndpoint: string;
  updateIntervalSeconds: number;
  intersectionCount: number;
}

export type Direction = 'north' | 'south' | 'east' | 'west';
export type LightState = 'red' | 'yellow' | 'green';
export type VehicleState = 'moving' | 'waiting' | 'crossing';
