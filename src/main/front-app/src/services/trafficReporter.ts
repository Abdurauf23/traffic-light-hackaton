import { useVehicleStore } from '../stores/vehicleStore';
import { useIntersectionStore } from '../stores/intersectionStore';
import { useConfigStore } from '../stores/configStore';
import { TrafficUpdateRequest } from '../types';
import { trafficAPIClient } from './apiClient';

export class TrafficReporter {
  private lastUpdateTime = 0;

  async reportIfNeeded(): Promise<void> {
    const config = useConfigStore.getState();
    const now = Date.now();
    const intervalMs = config.updateIntervalSeconds * 1000;

    if (now - this.lastUpdateTime < intervalMs) {
      return;
    }

    this.lastUpdateTime = now;
    await this.sendUpdate();
  }

  private async sendUpdate(): Promise<void> {
    const config = useConfigStore.getState();
    const vehicleStore = useVehicleStore.getState();
    const intersectionStore = useIntersectionStore.getState();

    const intersections: TrafficUpdateRequest['intersections'] = {};

    for (let i = 0; i < config.intersectionCount; i++) {
      const intersectionId = `intersection_${i + 1}`;

      // Get current light states
      const nsLightId = `${intersectionId}_north_south`;
      const ewLightId = `${intersectionId}_east_west`;

      const nsState = intersectionStore.getLightState(intersectionId, 'north_south');
      const ewState = intersectionStore.getLightState(intersectionId, 'east_west');

      // Determine individual direction states based on the combined light states
      // North and South follow north_south light
      const currentStateNorth = nsState;
      const currentStateSouth = nsState;
      // East and West follow east_west light
      const currentStateEast = ewState;
      const currentStateWest = ewState;

      // Get time in current state
      const timeInStateNS = intersectionStore.getTimeInCurrentState(nsLightId);
      const timeInStateEW = intersectionStore.getTimeInCurrentState(ewLightId);

      intersections[intersectionId] = {
        north: vehicleStore.countVehiclesByDirection(intersectionId, 'north'),
        south: vehicleStore.countVehiclesByDirection(intersectionId, 'south'),
        east: vehicleStore.countVehiclesByDirection(intersectionId, 'east'),
        west: vehicleStore.countVehiclesByDirection(intersectionId, 'west'),
        lanes_north: 1,
        lanes_south: 1,
        lanes_east: 1,
        lanes_west: 1,
        has_opposite: 1,
        has_left: 1,
        has_right: 1,
        current_state_north: currentStateNorth,
        current_state_south: currentStateSouth,
        current_state_east: currentStateEast,
        current_state_west: currentStateWest,
        time_in_state_north: timeInStateNS,
        time_in_state_south: timeInStateNS,
        time_in_state_east: timeInStateEW,
        time_in_state_west: timeInStateEW,
        cycle: 60,
      };
    }

    const request: TrafficUpdateRequest = {
      timestamp: new Date().toISOString(),
      intersections,
    };

    try {
      const response = await trafficAPIClient.sendTrafficUpdate(request);

      // Update light durations based on response
      for (const [intersectionId, timings] of Object.entries(response.intersections)) {
        intersectionStore.updateLightDurations(
          intersectionId,
          timings.north_south_green,
          timings.east_west_green,
          timings.yellow
        );
      }

      // Update last update timestamp
      config.setLastUpdateTimestamp(Date.now());
    } catch (error) {
      console.error('Failed to update traffic timings:', error);
    }
  }
}

export const trafficReporter = new TrafficReporter();
