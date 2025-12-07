package uz.traffic.light.hackaton.service.simulation;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import uz.traffic.light.hackaton.config.MLServiceConfig;
import uz.traffic.light.hackaton.model.ml.MLPredictResponse;
import uz.traffic.light.hackaton.model.simulation.SimulationStats;
import uz.traffic.light.hackaton.model.simulation.TrafficUpdateRequest;
import uz.traffic.light.hackaton.model.simulation.TrafficUpdateResponse;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicInteger;

@Service
@Slf4j
public class SimulationService {

    private final MLServiceConfig mlServiceConfig;
    private final RestTemplate restTemplate;
    private final AtomicBoolean isRunning = new AtomicBoolean(false);
    private final AtomicInteger totalVehicles = new AtomicInteger(0);
    private final Random random = new Random();

    public SimulationService(
            @Qualifier("myMLbean") MLServiceConfig mlServiceConfig, RestTemplate restTemplate) {
        this.mlServiceConfig = mlServiceConfig;
        this.restTemplate = restTemplate;
    }

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

            try {
                // Call Python ML service for optimal timing prediction
                MLPredictResponse mlResponse = callMLService(intersectionId, traffic);

                // Calculate combined green times from individual direction timings
                // North-South green is the average of north and south green times
                int nsGreen = (mlResponse.north().green() + mlResponse.south().green()) / 2;
                // East-West green is the average of east and west green times
                int ewGreen = (mlResponse.east().green() + mlResponse.west().green()) / 2;

                timings.put(intersectionId, new TrafficUpdateResponse.LightTimings(
                        nsGreen,
                        ewGreen,
                        5 // Yellow light duration (fixed)
                ));

                log.info("ML Service prediction for {}: NS={}s, EW={}s", intersectionId, nsGreen, ewGreen);
            } catch (Exception e) {
                log.error("Failed to call ML service for {}, falling back to simple algorithm", intersectionId, e);

                // Fallback to simple algorithm if ML service fails
                int northSouthTraffic = traffic.north() + traffic.south();
                int eastWestTraffic = traffic.east() + traffic.west();

                int nsGreen = Math.max(15, Math.min(40, 20 + northSouthTraffic * 2));
                int ewGreen = Math.max(15, Math.min(40, 20 + eastWestTraffic * 2));

                timings.put(intersectionId, new TrafficUpdateResponse.LightTimings(
                        nsGreen,
                        ewGreen,
                        5
                ));
            }
        }

        return new TrafficUpdateResponse(timings);
    }

    private MLPredictResponse callMLService(String intersectionId, TrafficUpdateRequest.IntersectionTraffic traffic) {
        LocalDateTime now = LocalDateTime.now();
        int timeOfDay = now.getHour();
        int dayOfWeek = now.getDayOfWeek().getValue(); // 1=Monday, 7=Sunday

        // Use values from request if available, otherwise use defaults
        int lanesNorth = traffic.lanesNorth() != null ? traffic.lanesNorth() : 1;
        int lanesSouth = traffic.lanesSouth() != null ? traffic.lanesSouth() : 1;
        int lanesEast = traffic.lanesEast() != null ? traffic.lanesEast() : 1;
        int lanesWest = traffic.lanesWest() != null ? traffic.lanesWest() : 1;
        int hasOpposite = traffic.hasOpposite() != null ? traffic.hasOpposite() : 1;
        int hasLeft = traffic.hasLeft() != null ? traffic.hasLeft() : 1;
        int hasRight = traffic.hasRight() != null ? traffic.hasRight() : 1;
        String currentStateNorth = traffic.currentStateNorth() != null ? traffic.currentStateNorth() : "red";
        String currentStateSouth = traffic.currentStateSouth() != null ? traffic.currentStateSouth() : "green";
        String currentStateEast = traffic.currentStateEast() != null ? traffic.currentStateEast() : "red";
        String currentStateWest = traffic.currentStateWest() != null ? traffic.currentStateWest() : "red";
        int timeInStateNorth = traffic.timeInStateNorth() != null ? traffic.timeInStateNorth() : 30;
        int timeInStateSouth = traffic.timeInStateSouth() != null ? traffic.timeInStateSouth() : 45;
        int timeInStateEast = traffic.timeInStateEast() != null ? traffic.timeInStateEast() : 10;
        int timeInStateWest = traffic.timeInStateWest() != null ? traffic.timeInStateWest() : 10;
        int cycle = traffic.cycle() != null ? traffic.cycle() : 60;

        // Build URL with query parameters matching Python service expectations
        String url = UriComponentsBuilder.fromHttpUrl(mlServiceConfig.getUrl() + "/predict")
                .queryParam("id", intersectionId)
                .queryParam("time_of_day", timeOfDay)
                .queryParam("day_of_week", dayOfWeek)
                .queryParam("congestion_north", traffic.north())
                .queryParam("congestion_south", traffic.south())
                .queryParam("congestion_east", traffic.east())
                .queryParam("congestion_west", traffic.west())
                .queryParam("speed_north", 60)
                .queryParam("lanes_north", lanesNorth)
                .queryParam("lanes_south", lanesSouth)
                .queryParam("lanes_east", lanesEast)
                .queryParam("lanes_west", lanesWest)
                .queryParam("has_opposite", hasOpposite)
                .queryParam("has_left", hasLeft)
                .queryParam("has_right", hasRight)
                .queryParam("current_state_north", currentStateNorth)
                .queryParam("current_state_south", currentStateSouth)
                .queryParam("current_state_east", currentStateEast)
                .queryParam("current_state_west", currentStateWest)
                .queryParam("time_in_state_north", timeInStateNorth)
                .queryParam("time_in_state_south", timeInStateSouth)
                .queryParam("time_in_state_east", timeInStateEast)
                .queryParam("time_in_state_west", timeInStateWest)
                .queryParam("cycle", cycle)
                .build()
                .toUriString();

        log.debug("Calling ML service: {}", url);
        return restTemplate.getForObject(url, MLPredictResponse.class);
    }
}
