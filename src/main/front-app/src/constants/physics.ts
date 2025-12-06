export const PHYSICS = {
  vehicleSpeed: 5, // units per second
  vehicleStopDistance: 2, // units from traffic light
  vehicleSafeDistance: 3, // units from other vehicles
  lightCycleDelay: 2, // seconds of all-red between phases
  defaultGreenDuration: 30, // seconds
  defaultYellowDuration: 5, // seconds
} as const;

export const SCENE_CONSTANTS = {
  roadWidth: 12,
  roadLength: 100,
  laneWidth: 3,
  intersectionSize: 20,
} as const;
