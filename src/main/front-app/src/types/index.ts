// Request payload (Frontend → Backend)
export interface TrafficUpdateRequest {
  timestamp: string;
  intersections: {
    [intersectionId: string]: IntersectionTrafficData;
  };
}

export interface IntersectionTrafficData {
  north: number;
  south: number;
  east: number;
  west: number;
  lanes_north?: number;
  lanes_south?: number;
  lanes_east?: number;
  lanes_west?: number;
  has_opposite?: number;
  has_left?: number;
  has_right?: number;
  current_state_north?: string;
  current_state_south?: string;
  current_state_east?: string;
  current_state_west?: string;
  time_in_state_north?: number;
  time_in_state_south?: number;
  time_in_state_east?: number;
  time_in_state_west?: number;
  cycle?: number;
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
