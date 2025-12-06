package uz.traffic.light.hackaton.service.simulation;

import org.springframework.stereotype.Service;
import uz.traffic.light.hackaton.model.simulation.SimulationStats;
import uz.traffic.light.hackaton.model.simulation.TrafficUpdateRequest;
import uz.traffic.light.hackaton.model.simulation.TrafficUpdateResponse;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class SimulationService {

    private final AtomicBoolean isRunning = new AtomicBoolean(false);
    private final AtomicInteger totalVehicles = new AtomicInteger(0);
    private final Random random = new Random();

    public void start() {
        isRunning.set(true);
        totalVehicles.set(0);
    }

    public void stop() {
        isRunning.set(false);
    }

    public boolean isRunning() {
        return isRunning.get();
    }

    public void optimize() {
        // AI optimization logic placeholder
        // This would call the OpenAI service to optimize traffic light timing
    }

    public SimulationStats getStats() {
        if (isRunning.get()) {
            // Simulate increasing vehicle count
            totalVehicles.addAndGet(random.nextInt(5) + 1);
        }

        return new SimulationStats(
                totalVehicles.get(),
                random.nextDouble() * 30 + 10, // Random wait time between 10-40 seconds
                isRunning.get() ? random.nextInt(20) + 40 : 0 // Throughput between 40-60 when running
        );
    }

    public TrafficUpdateResponse calculateOptimalTimings(TrafficUpdateRequest request) {
        Map<String, TrafficUpdateResponse.LightTimings> timings = new HashMap<>();

        for (Map.Entry<String, TrafficUpdateRequest.IntersectionTraffic> entry : request.intersections().entrySet()) {
            String intersectionId = entry.getKey();
            TrafficUpdateRequest.IntersectionTraffic traffic = entry.getValue();

            // Calculate total traffic for each direction pair
            int northSouthTraffic = traffic.north() + traffic.south();
            int eastWestTraffic = traffic.east() + traffic.west();

            // Simple algorithm: allocate time proportional to traffic volume
            // Base time: 20 seconds, additional: 2 seconds per vehicle (max 40 seconds)
            int nsGreen = Math.min(40, 20 + northSouthTraffic * 2);
            int ewGreen = Math.min(40, 20 + eastWestTraffic * 2);

            // Ensure minimum green time
            nsGreen = Math.max(15, nsGreen);
            ewGreen = Math.max(15, ewGreen);

            timings.put(intersectionId, new TrafficUpdateResponse.LightTimings(
                    nsGreen,
                    ewGreen,
                    5 // Yellow light duration
            ));
        }

        return new TrafficUpdateResponse(timings);
    }
}
