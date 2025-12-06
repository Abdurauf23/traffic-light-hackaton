import axios from 'axios';
import { TrafficUpdateRequest, TrafficUpdateResponse } from '../types';

class TrafficAPIClient {
  async sendTrafficUpdate(data: TrafficUpdateRequest): Promise<TrafficUpdateResponse> {
    try {
      const response = await axios.post<TrafficUpdateResponse>('/api/traffic-update', data);
      return response.data;
    } catch (error) {
      console.error('Failed to send traffic update:', error);
      throw error;
    }
  }
}

export const trafficAPIClient = new TrafficAPIClient();
