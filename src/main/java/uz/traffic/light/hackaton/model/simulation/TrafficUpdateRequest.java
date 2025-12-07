package uz.traffic.light.hackaton.model.simulation;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.Map;

public record TrafficUpdateRequest(
        String timestamp,
        Map<String, IntersectionTraffic> intersections
) {
    public record IntersectionTraffic(
            int north,
            int south,
            int east,
            int west,
            @JsonProperty("lanes_north") Integer lanesNorth,
            @JsonProperty("lanes_south") Integer lanesSouth,
            @JsonProperty("lanes_east") Integer lanesEast,
            @JsonProperty("lanes_west") Integer lanesWest,
            @JsonProperty("has_opposite") Integer hasOpposite,
            @JsonProperty("has_left") Integer hasLeft,
            @JsonProperty("has_right") Integer hasRight,
            @JsonProperty("current_state_north") String currentStateNorth,
            @JsonProperty("current_state_south") String currentStateSouth,
            @JsonProperty("current_state_east") String currentStateEast,
            @JsonProperty("current_state_west") String currentStateWest,
            @JsonProperty("time_in_state_north") Integer timeInStateNorth,
            @JsonProperty("time_in_state_south") Integer timeInStateSouth,
            @JsonProperty("time_in_state_east") Integer timeInStateEast,
            @JsonProperty("time_in_state_west") Integer timeInStateWest,
            Integer cycle
    ) {
    }
}
