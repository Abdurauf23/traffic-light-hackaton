package uz.traffic.light.hackaton.model.simulation;

import java.util.Map;

public record TrafficUpdateResponse(
        Map<String, LightTimings> intersections
) {
    public record LightTimings(
            int north_south_green,
            int east_west_green,
            int yellow
    ) {
    }
}
