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

      intersections[intersectionId] = {
        north: vehicleStore.countVehiclesByDirection(intersectionId, 'north'),
        south: vehicleStore.countVehiclesByDirection(intersectionId, 'south'),
        east: vehicleStore.countVehiclesByDirection(intersectionId, 'east'),
        west: vehicleStore.countVehiclesByDirection(intersectionId, 'west'),
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
    } catch (error) {
      console.error('Failed to update traffic timings:', error);
    }
  }
}

export const trafficReporter = new TrafficReporter();
