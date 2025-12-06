package uz.traffic.light.hackaton.model.simulation;

import java.util.Map;

public record TrafficUpdateRequest(
        String timestamp,
        Map<String, IntersectionTraffic> intersections
) {
    public record IntersectionTraffic(
            int north,
            int south,
            int east,
            int west
    ) {
    }
}
